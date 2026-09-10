package com.library.constant;

public final class ReaderConstants {

    private ReaderConstants() {}

    public static final String READER_ID_PREFIX = "RD";

    public static final int DEFAULT_PASSWORD_LENGTH = 8;
    public static final String DEFAULT_PASSWORD_PREFIX = "Lib@";

    public static final String NOTICE_EXPIRY_SUBJECT = "[Thư viện] Thẻ độc giả sắp hết hạn";
    public static final String NOTICE_EXPIRY_BODY =
            "Thẻ của bạn sẽ hết hạn trong %d ngày. Vui lòng gia hạn để tiếp tục sử dụng dịch vụ.";
}