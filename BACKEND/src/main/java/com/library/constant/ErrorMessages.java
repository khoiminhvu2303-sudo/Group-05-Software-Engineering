package com.library.constant;

public final class ErrorMessages {

    private ErrorMessages() {}

    // ===== SYSTEM =====
    public static final String INTERNAL_SERVER_ERROR = "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau!";
    public static final String RESOURCE_NOT_FOUND    = "Không tìm thấy dữ liệu yêu cầu!";
    public static final String INVALID_REQUEST_BODY  = "Dữ liệu đầu vào không hợp lệ hoặc thiếu thông tin!";
    public static final String METHOD_NOT_ALLOWED    = "Phương thức HTTP không được hỗ trợ!";
    public static final String BAD_REQUEST           = "Yêu cầu không hợp lệ!";
    public static final String VALIDATION_FAILED     = "Dữ liệu không hợp lệ!";

    // ===== AUTH & SECURITY =====
    public static final String UNAUTHORIZED_ACCESS = "Bạn chưa đăng nhập hoặc Token không hợp lệ!";
    public static final String ACCESS_DENIED       = "Bạn không có quyền thực hiện thao tác này!";
    public static final String BAD_CREDENTIALS     = "Tên đăng nhập hoặc mật khẩu không chính xác!";
    public static final String ACCOUNT_LOCKED      = "Tài khoản hiện đang bị khóa. Vui lòng liên hệ Admin!";
    public static final String ACCOUNT_SUSPENDED   = "Tài khoản đang bị tạm đình chỉ do vi phạm!";
    public static final String ACCOUNT_EXPIRED     = "Thẻ thư viện / Tài khoản của bạn đã hết hạn!";
    public static final String TOKEN_EXPIRED       = "Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại!";

    // ===== READER =====
    public static final String USERNAME_ALREADY_EXISTS = "Tên đăng nhập đã tồn tại trong hệ thống!";
    public static final String EMAIL_ALREADY_EXISTS    = "Email đã được sử dụng!";
    public static final String PHONE_ALREADY_EXISTS    = "Số điện thoại đã được đăng ký!";
    public static final String CCCD_ALREADY_EXISTS     = "Số CCCD đã được đăng ký!";
    public static final String READER_NOT_FOUND        = "Không tìm thấy thông tin độc giả!";
    public static final String READER_ALREADY_LOCKED   = "Tài khoản độc giả đã bị khóa!";
    public static final String READER_NOT_ACTIVE       = "Tài khoản độc giả không ở trạng thái hoạt động!";
    public static final String READER_INVALID_DATES    = "Ngày hết hạn phải sau ngày bắt đầu!";

    // ===== STAFF / ADMIN =====
    public static final String STAFF_NOT_FOUND       = "Không tìm thấy nhân viên!";
    public static final String ADMIN_NOT_FOUND       = "Không tìm thấy quản trị viên!";
    public static final String STAFF_USERNAME_EXISTS = "Tên đăng nhập nhân viên đã tồn tại!";
    public static final String ADMIN_USERNAME_EXISTS = "Tên đăng nhập admin đã tồn tại!";

    // ===== BOOK / BOOK COPY =====
    public static final String BOOK_NOT_FOUND           = "Không tìm thấy thông tin sách!";
    public static final String BOOK_TITLE_EXISTS        = "Tiêu đề sách đã tồn tại!";
    public static final String BOOK_NO_COPY             = "Sách chưa có bản sao nào trong kho!";
    public static final String BOOK_COPY_NOT_FOUND      = "Không tìm thấy bản sao sách (mã vạch không tồn tại)!";
    public static final String BOOK_COPY_NOT_AVAILABLE  = "Bản sao sách hiện không ở trạng thái sẵn sàng cho mượn!";
    public static final String BOOK_COPY_DAMAGED        = "Bản sao sách đang hư hỏng, không thể cho mượn!";
    public static final String DUPLICATE_BARCODE        = "Mã vạch bản sao sách đã tồn tại!";

    // ===== AUTHOR / PUBLISHER / CATEGORY =====
    public static final String AUTHOR_NOT_FOUND    = "Không tìm thấy tác giả!";
    public static final String PUBLISHER_NOT_FOUND = "Không tìm thấy nhà xuất bản!";
    public static final String CATEGORY_NOT_FOUND  = "Không tìm thấy thể loại!";

    // ===== BORROW / RETURN =====
    public static final String BORROW_RECORD_NOT_FOUND  = "Không tìm thấy phiếu mượn sách!";
    public static final String MAX_BORROW_LIMIT_EXCEEDED = "Độc giả đã vượt quá số lượng sách mượn tối đa cho phép!";
    public static final String BOOK_ALREADY_RETURNED    = "Cuốn sách này đã được trả trước đó!";
    public static final String READER_HAS_OVERDUE_BOOKS = "Độc giả đang có sách quá hạn chưa trả, không thể mượn thêm!";
    public static final String READER_HAS_UNPAID_FINES  = "Độc giả đang có tiền phạt chưa thanh toán, không thể mượn thêm!";
    public static final String BORROW_RENEWAL_LIMIT     = "Đã vượt quá số lần gia hạn cho phép!";
    public static final String BORROW_CANNOT_RENEW      = "Không thể gia hạn: sách đã bị đặt trước hoặc có ràng buộc khác!";

    // ===== RESERVATION =====
    public static final String RESERVATION_NOT_FOUND        = "Không tìm thấy thông tin đặt giữ sách!";
    public static final String ALREADY_RESERVED_BY_READER   = "Bạn đã đặt giữ cuốn sách này trước đó!";
    public static final String RESERVATION_EXPIRED          = "Yêu cầu đặt giữ sách đã hết hạn!";
    public static final String RESERVATION_COPY_NOT_AVAILABLE = "Bản sao sách không thể đặt trước!";

    // ===== FINE =====
    public static final String FINE_NOT_FOUND       = "Không tìm thấy hóa đơn phạt!";
    public static final String FINE_ALREADY_PAID    = "Hóa đơn phạt đã được thanh toán!";

    // ===== VALIDATION =====
    public static final String MISSING_REQUIRED_FIELD = "Thiếu trường bắt buộc: ";
    public static final String INVALID_FORMAT         = "Định dạng không hợp lệ: ";
}