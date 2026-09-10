package com.library.constant;

public final class ValidationConstants {

    private ValidationConstants() {}

    // ===== LENGTH (khớp DB schema) =====
    public static final int MIN_USERNAME_LENGTH = 4;
    public static final int MAX_USERNAME_LENGTH = 50;

    public static final int MIN_PASSWORD_LENGTH = 6;
    public static final int MAX_PASSWORD_LENGTH = 50;

    public static final int MAX_NAME_LENGTH    = 50;   // VARCHAR(50)
    public static final int MAX_TITLE_LENGTH   = 50;   // VARCHAR(50)
    public static final int MAX_ADDRESS_LENGTH = 50;   // VARCHAR(50)
    public static final int MAX_NOTE_LENGTH    = 255;  // VARCHAR(255)
    public static final int LENGTH_PHONE       = 10;   // CHAR(10)
    public static final int LENGTH_CCCD        = 12;   // CHAR(12)
    public static final int MAX_BARCODE_LENGTH = 50;

    // ===== MONEY =====
    public static final int MONEY_PRECISION = 12;
    public static final int MONEY_SCALE     = 2;

    // ===== MESSAGES =====
    public static final String REQUIRED_FULL_NAME = "Họ tên là bắt buộc";
    public static final String REQUIRED_USERNAME  = "Tên đăng nhập là bắt buộc";
    public static final String REQUIRED_PASSWORD  = "Mật khẩu là bắt buộc";
    public static final String REQUIRED_EMAIL     = "Email là bắt buộc";
    public static final String REQUIRED_PHONE     = "Số điện thoại là bắt buộc";
    public static final String REQUIRED_CCCD      = "CCCD là bắt buộc";
    public static final String REQUIRED_GENDER    = "Giới tính là bắt buộc";
    public static final String REQUIRED_TITLE     = "Tiêu đề sách là bắt buộc";
    public static final String REQUIRED_BARCODE   = "Barcode là bắt buộc";

    public static final String PASSWORD_TOO_SHORT = "Mật khẩu tối thiểu " + MIN_PASSWORD_LENGTH + " ký tự";
    public static final String PASSWORD_TOO_LONG  = "Mật khẩu tối đa "  + MAX_PASSWORD_LENGTH + " ký tự";
    public static final String EMAIL_INVALID      = "Email không hợp lệ";
    public static final String PHONE_INVALID      = "Số điện thoại phải gồm đúng 10 chữ số";
    public static final String CCCD_INVALID       = "CCCD phải gồm đúng 12 chữ số";
    public static final String SALARY_NEGATIVE    = "Lương không được âm";
    public static final String DATE_INVALID       = "Ngày hết hạn phải sau ngày bắt đầu";
    public static final String USERNAME_INVALID   = "Tên đăng nhập 4-50 ký tự, chỉ chữ/số/gạch dưới";
}