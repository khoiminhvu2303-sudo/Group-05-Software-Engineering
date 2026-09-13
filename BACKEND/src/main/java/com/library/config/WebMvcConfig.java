package com.library.config;

import com.library.interceptor.AuditLogInterceptor;
import com.library.interceptor.CorrelationIdInterceptor;
import com.library.interceptor.PerformanceInterceptor;
import com.library.interceptor.RateLimitInterceptor;
import com.library.interceptor.RequestLoggingInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Đăng ký interceptor theo thứ tự rõ ràng.
 * CORS đã dời sang SecurityConfig (CorsConfigurationSource bean) — KHÔNG khai báo ở đây.
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    private final CorrelationIdInterceptor correlationIdInterceptor;
    private final RequestLoggingInterceptor requestLoggingInterceptor;
    private final PerformanceInterceptor performanceInterceptor;
    private final RateLimitInterceptor rateLimitInterceptor;
    private final AuditLogInterceptor auditLogInterceptor;

    public WebMvcConfig(CorrelationIdInterceptor correlationIdInterceptor,
                        RequestLoggingInterceptor requestLoggingInterceptor,
                        PerformanceInterceptor performanceInterceptor,
                        RateLimitInterceptor rateLimitInterceptor,
                        AuditLogInterceptor auditLogInterceptor) {
        this.correlationIdInterceptor = correlationIdInterceptor;
        this.requestLoggingInterceptor = requestLoggingInterceptor;
        this.performanceInterceptor = performanceInterceptor;
        this.rateLimitInterceptor = rateLimitInterceptor;
        this.auditLogInterceptor = auditLogInterceptor;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 1. Correlation ID — phải chạy đầu để mọi log có traceId
        registry.addInterceptor(correlationIdInterceptor)
                .addPathPatterns("/**")
                .order(1);

        // 2. Request logging
        registry.addInterceptor(requestLoggingInterceptor)
                .addPathPatterns("/api/**")
                .order(2);

        // 3. Performance
        registry.addInterceptor(performanceInterceptor)
                .addPathPatterns("/api/**")
                .order(3);

        // 4. Rate limit — áp cho auth + toàn bộ API
        registry.addInterceptor(rateLimitInterceptor)
                .addPathPatterns("/api/**")
                .order(4);

        // 5. Audit log — phải chạy sau authentication
        registry.addInterceptor(auditLogInterceptor)
                .addPathPatterns("/api/**")
                .order(5);
    }
}
