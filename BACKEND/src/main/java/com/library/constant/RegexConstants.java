package com.library.constant;

public final class RegexConstants {

    private RegexConstants() {}

    public static final String PHONE    = "^(03|05|07|08|09)[0-9]{8}$";
    public static final String CCCD     = "^[0-9]{12}$";
    public static final String EMAIL    = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$";
    public static final String USERNAME = "^[A-Za-z0-9_]{4,50}$";
    public static final String BARCODE  = "^BC[0-9]{8}$";
    public static final String ISBN     = "^(978|979)[0-9]{10}$";

    // ===== MESSAGES =====
    public static final String MSG_PHONE    = "Số điện thoại không hợp lệ (VD: 0912345678)";
    public static final String MSG_CCCD     = "CCCD phải gồm 12 chữ số";
    public static final String MSG_EMAIL    = "Email không hợp lệ";
    public static final String MSG_USERNAME = "Tên đăng nhập 4-50 ký tự, chỉ chữ/số/gạch dưới";
    public static final String MSG_BARCODE  = "Barcode phải có dạng BC########";
}