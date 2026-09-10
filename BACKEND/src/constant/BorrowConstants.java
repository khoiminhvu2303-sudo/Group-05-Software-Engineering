package com.library.constant;

public final class BorrowConstants {

    private BorrowConstants() {}

    public static final String BORROW_ID_PREFIX = "TRX";
    public static final String DETAIL_ID_PREFIX = "BD";

    public static final int REMIND_BEFORE_DUE_DAYS = 2;

    public static final String REMINDER_SUBJECT = "[Thư viện] Sách sắp đến hạn trả";
    public static final String REMINDER_BODY    =
            "Phiếu mượn %s sẽ đến hạn vào %s. Vui lòng trả sách đúng hạn.";
    public static final String OVERDUE_SUBJECT  = "[Thư viện] Sách đã quá hạn trả";
}
