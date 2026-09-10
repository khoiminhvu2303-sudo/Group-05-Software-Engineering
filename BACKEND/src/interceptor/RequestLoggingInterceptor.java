package com.library.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * Log request/response để debug. Không log body để tránh lộ dữ liệu nhạy cảm.
 */
@Component
public class RequestLoggingInterceptor implements HandlerInterceptor {

    private static final Logger log = LoggerFactory.getLogger(RequestLoggingInterceptor.class);
    private static final String START_ATTR = "REQ_START_TIME";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        request.setAttribute(START_ATTR, System.currentTimeMillis());

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String user = (auth != null && auth.isAuthenticated()
                && !"anonymousUser".equals(auth.getPrincipal()))
                ? auth.getName()
                : "anonymous";

        log.info("[REQ] {} {} | user={} | ip={}",
                request.getMethod(), request.getRequestURI(), user, request.getRemoteAddr());
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object handler, Exception ex) {
        Object startObj = request.getAttribute(START_ATTR);
        long duration = startObj != null ? System.currentTimeMillis() - (long) startObj : 0;

        log.info("[RES] {} {} | status={} | time={}ms",
                request.getMethod(), request.getRequestURI(), response.getStatus(), duration);

        if (ex != null) {
            log.error("[RES-EX] {} {} | error={}",
                    request.getMethod(), request.getRequestURI(), ex.getMessage());
        }
    }
}