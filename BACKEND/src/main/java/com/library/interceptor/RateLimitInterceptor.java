package com.library.interceptor;

import com.github.benmanes.caffeine.cache.Cache;
import com.github.benmanes.caffeine.cache.Caffeine;
import com.library.constant.ApiPathConstants;
import com.library.constant.SecurityConstants;
import jakarta.annotation.PostConstruct;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.commons.net.util.SubnetUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import java.time.Duration;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * Rate limit theo IP + endpoint-group.
 * - Caffeine cache (bounded LRU + TTL) → không rò rỉ RAM.
 * - Quyết định allow/deny atomic trong compute().
 * - Cap count ở (maxReq + 1) → chống overflow khi DDoS.
 * - Chỉ tin XFF khi remoteAddr thuộc trusted-proxies.
 * - Tách bucket theo endpoint để không đốt quota chung.
 */
@Component
public class RateLimitInterceptor implements HandlerInterceptor {

    private static final Logger log = LoggerFactory.getLogger(RateLimitInterceptor.class);

    private static final String LOGIN_PATH    = ApiPathConstants.AUTH + "/login";
    private static final String REGISTER_PATH = ApiPathConstants.AUTH + "/register";

    @Value("${app.rate-limit.enabled:true}")               private boolean enabled;
    @Value("${app.rate-limit.default.max-requests:100}")   private int defaultMaxRequests;
    @Value("${app.rate-limit.default.window-seconds:60}")  private int defaultWindowSeconds;
    @Value("${app.rate-limit.login.max-requests:5}")       private int loginMaxRequests;
    @Value("${app.rate-limit.login.window-seconds:60}")    private int loginWindowSeconds;
    @Value("${app.rate-limit.cache-max-size:10000}")       private long cacheMaxSize;
    @Value("${app.trusted-proxies:127.0.0.1}")             private String[] trustedProxies;

    private Cache<String, Window> cache;
    private final List<SubnetUtils.SubnetInfo> trustedSubnets = new CopyOnWriteArrayList<>();

    @PostConstruct
    void init() {
        int maxWindow = Math.max(defaultWindowSeconds, loginWindowSeconds);
        long ttlMinutes = Math.max(5L, maxWindow / 60L + 1L);

        this.cache = Caffeine.newBuilder()
                .maximumSize(cacheMaxSize)
                .expireAfterWrite(Duration.ofMinutes(ttlMinutes))
                .build();

        if (trustedProxies != null) {
            for (String raw : trustedProxies) {
                if (!StringUtils.hasText(raw)) continue;
                try {
                    String cidr = raw.contains("/") ? raw : raw + "/32";
                    trustedSubnets.add(new SubnetUtils(cidr).getInfo());
                } catch (IllegalArgumentException ex) {
                    log.error("Trusted proxy không hợp lệ (bỏ qua): {}", raw, ex);
                }
            }
        }
        log.info("RateLimitInterceptor initialized: trustedProxies={}, cacheMaxSize={}",
                trustedSubnets.size(), cacheMaxSize);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        if (!enabled) return true;

        String ip  = getClientIp(request);
        String uri = request.getRequestURI();

        boolean isAuth = LOGIN_PATH.equals(uri) || REGISTER_PATH.equals(uri);
        int maxReq     = isAuth ? loginMaxRequests    : defaultMaxRequests;
        int windowSec  = isAuth ? loginWindowSeconds  : defaultWindowSeconds;

        String bucketKey = ip + "::" + (isAuth ? "auth" : extractRootSegment(uri));
        long   windowNs  = Duration.ofSeconds(windowSec).toNanos();

        AtomicBoolean allowed = new AtomicBoolean(true);

        cache.asMap().compute(bucketKey, (k, w) -> {
            long t = System.nanoTime();
            if (w == null || t - w.startNs > windowNs) {
                return new Window(t, 1);
            }
            long newCount = Math.min(w.count + 1, (long) maxReq + 1);
            if (newCount > maxReq) {
                allowed.set(false);
            }
            return new Window(w.startNs, newCount);
        });

        if (!allowed.get()) {
            log.warn("[RATE-LIMIT] ip={} uri={} bucket={} window={}s",
                    ip, uri, bucketKey, windowSec);

            response.setStatus(429);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setCharacterEncoding("UTF-8");
            response.setHeader("Retry-After", String.valueOf(windowSec));
            response.setHeader("Cache-Control", CacheControl.noStore().getHeaderValue());
            response.getWriter().write(
                    "{\"error\":\"TOO_MANY_REQUESTS\","
                            + "\"message\":\"Quá nhiều yêu cầu. Vui lòng thử lại sau "
                            + windowSec + " giây.\"}");
            return false;
        }
        return true;
    }

    private String getClientIp(HttpServletRequest request) {
        String remote = request.getRemoteAddr();
        if (!isTrustedProxy(remote)) {
            return remote;
        }
        String xff = request.getHeader(SecurityConstants.CLIENT_IP_HEADER);
        if (StringUtils.hasText(xff) && !"unknown".equalsIgnoreCase(xff)) {
            int comma = xff.indexOf(',');
            return (comma > 0 ? xff.substring(0, comma) : xff).trim();
        }
        return remote;
    }

    private boolean isTrustedProxy(String ip) {
        if (!StringUtils.hasText(ip)) return false;
        if (ip.startsWith("::ffff:")) {
            ip = ip.substring(7);
        }
        final String ipFinal = ip;
        return trustedSubnets.stream().anyMatch(s -> s.isInRange(ipFinal));
    }

    /** /api/books/123 → "books"; /api/borrows → "borrows"; /api → "root". */
    private String extractRootSegment(String uri) {
        String[] parts = uri.split("/");
        return parts.length > 2 ? parts[2] : "root";
    }

    private record Window(long startNs, long count) {}
}