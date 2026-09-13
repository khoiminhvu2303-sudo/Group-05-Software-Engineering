package com.library.constant;

public final class AuditActionConstants {

    private AuditActionConstants() {}

    // ===== AUTH =====
    public static final String LOGIN           = "LOGIN";
    public static final String LOGIN_FAILED    = "LOGIN_FAILED";
    public static final String LOGOUT          = "LOGOUT";
    public static final String REGISTER        = "REGISTER";
    public static final String CHANGE_PASSWORD = "CHANGE_PASSWORD";

    // ===== CRUD =====
    public static final String CREATE = "CREATE";
    public static final String UPDATE = "UPDATE";
    public static final String DELETE = "DELETE";

    // ===== READER =====
    public static final String LOCK_ACCOUNT    = "LOCK_ACCOUNT";
    public static final String UNLOCK_ACCOUNT  = "UNLOCK_ACCOUNT";
    public static final String SUSPEND_ACCOUNT = "SUSPEND_ACCOUNT";
    public static final String RENEW_CARD      = "RENEW_CARD";

    // ===== CIRCULATION =====
    public static final String BORROW_BOOK        = "BORROW_BOOK";
    public static final String RETURN_BOOK        = "RETURN_BOOK";
    public static final String RENEW_BOOK         = "RENEW_BOOK";
    public static final String RESERVE_BOOK       = "RESERVE_BOOK";
    public static final String CANCEL_RESERVATION = "CANCEL_RESERVATION";

    // ===== FINE =====
    public static final String PAY_FINE = "PAY_FINE";
}
