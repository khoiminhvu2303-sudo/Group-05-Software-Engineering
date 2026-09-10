package com.library.constant;

public final class RoleConstants {

    private RoleConstants() {}

    /** Dùng cho hasRole() / hasAnyRole() — Spring tự thêm prefix ROLE_. */
    public static final String ADMIN  = "ADMIN";
    public static final String STAFF  = "STAFF";
    public static final String READER = "READER";

    /** Dùng cho hasAuthority() — cần prefix đầy đủ. */
    public static final String ROLE_ADMIN  = "ROLE_ADMIN";
    public static final String ROLE_STAFF  = "ROLE_STAFF";
    public static final String ROLE_READER = "ROLE_READER";
}