package com.library.interceptor;

import com.library.constant.SecurityConstants;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.MDC;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.UUID;

/**
 * Sinh / lấy X-Correlation-Id để trace log xuyên suốt request.
 * Đẩy vào MDC để mọi log trong request đều có traceId.
 */
@Component
public class CorrelationIdInterceptor implements HandlerInterceptor {

    private static final String MDC_KEY = "correlationId";

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        String correlationId = request.getHeader(SecurityConstants.CORRELATION_ID_HEADER);
        if (!StringUtils.hasText(correlationId)) {
            correlationId = UUID.randomUUID().toString();
        }
        MDC.put(MDC_KEY, correlationId);
        response.setHeader(SecurityConstants.CORRELATION_ID_HEADER, correlationId);
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object handler, Exception ex) {
        MDC.remove(MDC_KEY);
    }
}