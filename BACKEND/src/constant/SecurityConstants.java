package com.library.constant;

public final class SecurityConstants {

    private SecurityConstants() {}

    // ===== JWT =====
    public static final String JWT_HEADER        = "Authorization";
    public static final String JWT_PREFIX        = "Bearer ";
    public static final String JWT_CLAIM_ROLE    = "role";
    public static final String JWT_CLAIM_USER_ID = "userId";

    // ===== HEADER =====
    public static final String CORRELATION_ID_HEADER = "X-Correlation-Id";
    public static final String CLIENT_IP_HEADER      = "X-Forwarded-For";

    // ===== ROLE PREFIX =====
    public static final String ROLE_PREFIX = "ROLE_";

    // ===== PUBLIC ENDPOINTS =====
    public static final String[] PUBLIC_ENDPOINTS = {
            "/error",
            "/api/auth/**",
            "/api/public/**",
            "/swagger-ui/**",
            "/swagger-ui.html",
            "/swagger-ui/index.html",
            "/v3/api-docs/**",
            "/api-docs/**"
    };
}