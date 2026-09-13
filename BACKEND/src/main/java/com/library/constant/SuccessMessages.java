package com.library.constant;

public final class SuccessMessages {

    private SuccessMessages() {}

    // ===== AUTH =====
    public static final String LOGIN_SUCCESS    = "Đăng nhập thành công!";
    public static final String LOGOUT_SUCCESS   = "Đăng xuất thành công!";
    public static final String REGISTER_SUCCESS = "Đăng ký tài khoản độc giả thành công!";
    public static final String PASSWORD_CHANGED = "Đổi mật khẩu thành công!";

    // ===== READER =====
    public static final String READER_CREATED      = "Tạo độc giả thành công!";
    public static final String READER_UPDATED      = "Cập nhật độc giả thành công!";
    public static final String READER_LOCKED       = "Khóa tài khoản độc giả thành công!";
    public static final String READER_UNLOCKED     = "Mở khóa tài khoản độc giả thành công!";
    public static final String READER_SUSPENDED    = "Tạm đình chỉ tài khoản độc giả thành công!";
    public static final String READER_CARD_RENEWED = "Gia hạn thẻ độc giả thành công!";

    // ===== STAFF / ADMIN =====
    public static final String STAFF_CREATED = "Tạo nhân viên thành công!";
    public static final String STAFF_UPDATED = "Cập nhật nhân viên thành công!";
    public static final String ADMIN_CREATED = "Tạo quản trị viên thành công!";

    // ===== BOOK =====
    public static final String BOOK_CREATED      = "Thêm mới thông tin sách thành công!";
    public static final String BOOK_UPDATED      = "Cập nhật thông tin sách thành công!";
    public static final String BOOK_DELETED      = "Xóa thông tin sách thành công!";
    public static final String BOOK_COPY_CREATED = "Tạo bản sao sách mới thành công!";
    public static final String BOOK_COPY_UPDATED = "Cập nhật bản sao sách thành công!";
    public static final String BARCODE_PRINTED   = "Đã in barcode cho bản sao!";

    // ===== CIRCULATION =====
    public static final String BORROW_SUCCESS       = "Lập phiếu mượn sách thành công!";
    public static final String RETURN_SUCCESS       = "Xác nhận trả sách thành công!";
    public static final String RENEW_SUCCESS        = "Gia hạn thời gian mượn sách thành công!";
    public static final String BORROW_SLIP_PRINTED  = "Đã in phiếu mượn!";

    // ===== RESERVATION =====
    public static final String RESERVATION_CREATED   = "Đặt giữ sách thành công! Vui lòng đến nhận sách đúng hạn.";
    public static final String RESERVATION_CANCELLED = "Hủy yêu cầu đặt giữ sách thành công!";
    public static final String RESERVATION_COMPLETED = "Hoàn tất đặt giữ sách thành công!";

    // ===== FINE =====
    public static final String FINE_CREATED         = "Tạo hóa đơn phạt thành công!";
    public static final String FINE_PAID_SUCCESS    = "Thanh toán tiền phạt thành công!";
    public static final String FINE_RECEIPT_PRINTED = "Đã in biên lai thanh toán!";

    // ===== GENERAL =====
    public static final String OPERATION_SUCCESS = "Thao tác thành công!";
    public static final String DATA_RETRIEVED    = "Lấy dữ liệu thành công!";
    public static final String USER_STATUS_UPDATED = "Cập nhật trạng thái người dùng thành công!";
}