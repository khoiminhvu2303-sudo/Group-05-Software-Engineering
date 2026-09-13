package com.library.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

@Slf4j
@Component
@Order(2) 
@RequiredArgsConstructor
public class RateLimitingFilter extends OncePerRequestFilter {

    private final StringRedisTemplate redisTemplate;

    @Value("${app.rate-limit.max-requests:100}")
    private int maxRequests;

    @Value("${app.rate-limit.window-seconds:60}")
    private int windowSeconds;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String clientIp = getClientIp(request);
        String key = "rate_limit:" + clientIp;

        try {
            
            Long currentCount = redisTemplate.opsForValue().increment(key);

            if (currentCount != null && currentCount == 1) {
                
                redisTemplate.expire(key, windowSeconds, TimeUnit.SECONDS);
            }

            
            response.setHeader("X-RateLimit-Limit", String.valueOf(maxRequests));
            response.setHeader("X-RateLimit-Remaining", String.valueOf(Math.max(0, maxRequests - (currentCount != null ? currentCount : 0))));

            if (currentCount != null && currentCount > maxRequests) {
                log.warn("Rate limit exceeded for IP: {}. Count: {}", clientIp, currentCount);
                response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"Too many requests. Please try again later.\"}");
                return;
            }

        } catch (Exception e) {
        
            log.error("Redis error during rate limiting. Allowing request.", e);
        }

        filterChain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }
}
