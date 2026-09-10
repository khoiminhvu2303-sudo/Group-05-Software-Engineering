package com.library.interceptor;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Đánh dấu controller method cần ghi audit log.
 * AuditLogInterceptor chỉ ghi khi method có annotation này.
 */
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Auditable {
    String action();
    String table() default "";
    String description() default "";
}