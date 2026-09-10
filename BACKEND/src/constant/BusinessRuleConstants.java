package com.library.constant;

import java.math.BigDecimal;

/**
 * Con số nghiệp vụ theo Library System Process Description.
 */
public final class BusinessRuleConstants {

    private BusinessRuleConstants() {}

    // ===== BORROW =====
    /** 1.4.4 Step 4: hạn mượn 14 ngày */
    public static final int BORROW_PERIOD_DAYS   = 14;
    /** 1.4.5 Step 3: gia hạn tối đa 4 lần/đầu sách */
    public static final int MAX_RENEWAL_PER_BOOK = 4;
    /** Mỗi lần gia hạn cộng thêm 7 ngày */
    public static final int RENEWAL_EXTEND_DAYS  = 7;
    /** Hạn mức số sách đang mượn đồng thời */
    public static final int MAX_BORROW_LIMIT     = 5;

    // ===== READER CARD =====
    /** Thẻ có giá trị 1 năm kể từ StartDate */
    public static final int CARD_VALIDITY_YEARS = 1;
    /** 1.4.2 Step 5: nhắc trước 5-7 ngày khi thẻ hết hạn */
    public static final int CARD_EXPIRY_NOTICE_DAYS = 7;

    // ===== RESERVATION =====
    /** Giữ sách tối đa 48h sau khi đặt trước */
    public static final int RESERVATION_HOLD_HOURS = 48;
    /** Tối đa 3 đặt trước đang chờ */
    public static final int MAX_PENDING_RESERVATIONS = 3;

    // ===== FINE =====
    public static final BigDecimal FINE_PER_DAY_LATE   = new BigDecimal("5000");
    public static final BigDecimal FINE_LOST_BOOK_RATE = new BigDecimal("1.0");
    public static final BigDecimal FINE_DAMAGED_RATE   = new BigDecimal("0.5");

    // ===== SCHEDULER (cron) =====
    public static final String CRON_EXPIRED_CARD_SCAN        = "0 5 0 * * ?";
    public static final String CRON_EXPIRED_RESERVATION_SCAN = "0 0 * * * ?";
    public static final String CRON_OVERDUE_BORROW_SCAN      = "0 0 1 * * ?";
}