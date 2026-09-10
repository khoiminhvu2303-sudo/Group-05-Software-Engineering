package com.library.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * Đo thời gian xử lý request. Cảnh báo WARN nếu vượt ngưỡng.
 */
@Component
public class PerformanceInterceptor implements HandlerInterceptor {

    private static final Logger log = LoggerFactory.getLogger(PerformanceInterceptor.class);
    private static final String START_ATTR = "PERF_START_NS";

    @Value("${app.performance.warn-threshold-ms:1000}")
    private long warnThresholdMs;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        request.setAttribute(START_ATTR, System.nanoTime());
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object handler, Exception ex) {
        Object startObj = request.getAttribute(START_ATTR);
        if (startObj == null) return;

        long elapsedMs = (System.nanoTime() - (long) startObj) / 1_000_000;

        if (elapsedMs >= warnThresholdMs) {
            log.warn("[SLOW API] {} {} took {}ms (threshold={}ms)",
                    request.getMethod(), request.getRequestURI(), elapsedMs, warnThresholdMs);
        }
    }
}