4. Use case Diagram:
1.	Overview of Use-Case Diagrams
   1.1	List of Actor
  	1.1.1. Guest: Guests or users who have not logged into the system.
  	1.1.2. Reader: Registered readers who have been issued a library card have an account to access online functions (OPAC, renewals, and holds).
  	1.1.3  Staff: The librarian on duty at the circulation desk is authorized to handle circulation transactions (lending and returns) and manage the   collection.
  	1.1.4  Admin: Senior system administrator responsible for managing library staff, configuring library policies, and approving reports
   1.2	List of Use-case
  	1.2.1 Register Account: Sign up for a new reader account.
  	1.2.2 Log in: Log in to the system
  	1.2.3 Recover Password: Reset forgotten password.
  	1.2.4 View Personal Information: View personal profile details.
  	1.2.5 Search Books: Search for library books.
  	1.2.6 Reserve Book: Hold a book on the shelf.
  	1.2.7 View Borrowing History: View past and current book borrows.
  	1.2.8 Add to Online Wishlist: Save favorite books to list.
  	1.2.9 Remove from Online Wishlist: Delete books from wishlist
  	1.2.10 Renew Books Online: Extend book borrow via web/app.
  	1.2.11 Manage Book Catalog: Add, edit, or delete books.
  	1.2.12 Process Borrowing: Issue physical books to readers. 
  	1.2.13 Over-the-Counter Renewal: Extend book borrow at the counter.
  	1.2.14 Verify Reader Card: Validate reader card status.
  	1.2.15 Process Return: Receive returned books
  	1.2.16 Issue Fine Ticket: Create overdue or damage fine.
  	1.2.17 Print Receipt: Print transaction receipts.
  	1.2.18 Collect Fine Payment: Receive fine payment from reader
  	1.2.19 Manage Staff Accounts: Add, edit, or delete staff profiles
  	1.2.20 Manage Reader Accounts: Edit and activate reader accounts.
  	1.2.21 Statistics & Reports: View and export library reports
  	1.2.22 View Registration Requests: View pending sign-up requests
  	1.2.23 Approve Reader Card Issue: Activate card and issue QR code
  	2. Use-case Register Account
2.1. Tóm tắt: Cho phép khách vãng lai đăng ký tài khoản độc giả trực tuyến để gửi yêu cầu cấp thẻ thành viên mới lên hệ thống.
2.2. Dòng sự kiện:
2.2.1. Dòng sự kiện chính:
1.	Người dùng chọn chức năng "Đăng ký tài khoản" trên giao diện OPAC.
2.	Hệ thống yêu cầu người dùng cung cấp thông tin cá nhân: Họ tên, ngày sinh, giới tính, số điện thoại, địa chỉ email, số CCCD, địa chỉ thường trú và mật khẩu khởi tạo.
3.	Người dùng nhập thông tin và xác nhận gửi yêu cầu.
4.	Hệ thống kiểm tra tính hợp lệ và đối chiếu dữ liệu trùng lặp (tránh trùng Email, SĐT hoặc CCCD trong cơ sở dữ liệu D1: Readers).
5.	Hệ thống lưu hồ sơ độc giả ở trạng thái chờ duyệt ("Pending Approval") và gửi thông báo đăng ký thành công cho người dùng.
2.2.2. Các dòng sự kiện khác:
o Trường hợp tên đăng nhập (email) đã tồn tại: Hệ thống hiển thị thông báo lỗi "Email này đã được sử dụng". Người dùng có thể chọn nhập lại email khác hoặc hủy bỏ đăng ký.
o Trường hợp nhập thiếu các thông tin bắt buộc: Nếu người dùng nhập thiếu Họ tên, Email, Số điện thoại, CCCD hoặc mật khẩu dưới 6 ký tự, hệ thống báo lỗi cụ thể ở từng trường dữ liệu để người dùng sửa đổi.
2.3. Các yêu cầu đặc biệt:
o	Mật khẩu khi lưu trữ vào cơ sở dữ liệu bắt buộc phải được mã hóa một chiều sử dụng hàm băm bảo mật (Hash Function SHA-256 trở lên, tối thiểu 160 bits).
o	Chức năng đăng ký trực tuyến phải tích hợp mã Captcha để chống việc làm ngập lụt dữ liệu bởi các chương trình tự động.
2.4. Trạng thái hệ thống sau khi thực hiện Use-case: Yêu cầu đăng ký được ghi nhận thành công vào bảng Reader ở trạng thái "Pending Approval". Trạng thái dữ liệu hệ thống được cập nhật an toàn.


3. Use-case Log In
3.1. Tóm tắt: Xác thực thông tin đăng nhập của người dùng (Độc giả, Thủ thư, Quản trị viên) để cấp quyền truy cập chức năng tương ứng trong hệ thống.
3.2. Dòng sự kiện:
3.2.1. Dòng sự kiện chính:
1.	Người dùng truy cập trang đăng nhập và cung cấp tên đăng nhập (Email) cùng mật khẩu.
2.	Người dùng nhấn nút xác nhận "Đăng nhập".
3.	Hệ thống tiến hành mã hóa mật khẩu người dùng vừa nhập và so khớp với thông tin đã được mã hóa trong cơ sở dữ liệu (D1: Readers, D5: Staffs, hoặc Admin).
4.	Nếu khớp thông tin, hệ thống cho phép đăng nhập và chuyển hướng người dùng tới giao diện làm việc tương ứng với vai trò đã được phân quyền.
3.2.2. Các dòng sự kiện khác:
o	Trường hợp tên đăng nhập hoặc mật khẩu bị sai: Hệ thống hiển thị thông báo lỗi "Tên đăng nhập hoặc mật khẩu không chính xác" (không chỉ rõ sai ở trường nào để tăng tính bảo mật). Người dùng nhập lại hoặc hủy giao dịch.
3.3. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Người dùng ở trạng thái chưa đăng nhập vào hệ thống.
3.4. Trạng thái hệ thống sau khi thực hiện Use-case: Người dùng đăng nhập thành công và được cấp Token xác thực quyền truy cập cho phiên làm việc hiện tại.
3.5. Điểm mở rộng:
o	Use-case Recover Password: Người dùng có thể chọn chuyển sang chức năng "Quên mật khẩu" nếu không nhớ mật khẩu đăng nhập của mình.
4. Use-case Recover Password
4.1. Tóm tắt: Cho phép người dùng lấy lại quyền truy cập tài khoản khi quên mật khẩu thông qua email cá nhân đã đăng ký.
4.2. Dòng sự kiện:
4.2.1. Dòng sự kiện chính:
1.	Người dùng chọn chức năng "Quên mật khẩu" từ màn hình đăng nhập.
2.	Hệ thống yêu cầu người dùng cung cấp địa chỉ email tài khoản đã đăng ký trên hệ thống.
3.	Hệ thống kiểm tra sự tồn tại của email trong cơ sở dữ liệu.
4.	Nếu email tồn tại, hệ thống tự động sinh một chuỗi mật khẩu ngẫu nhiên mới, cập nhật vào bảng dữ liệu tương ứng của người dùng, và đồng thời gửi email chứa mật khẩu mới này tới hòm thư của người dùng.
5.	Hệ thống hiển thị thông báo yêu cầu người dùng kiểm tra hòm thư cá nhân để nhận mật khẩu mới.
4.2.2. Các dòng sự kiện khác:
o	Trường hợp email không tồn tại trên hệ thống: Hệ thống thông báo lỗi "Địa chỉ email không tồn tại trên hệ thống". Người dùng nhập lại email hoặc thoát chức năng.
4.3. Các yêu cầu đặc biệt: Mật khẩu mới phải được sinh hoàn toàn ngẫu nhiên bởi thuật toán mã hóa bảo mật của hệ thống và lập tức mã hóa băm trước khi lưu vào DB.
4.4. Trạng thái hệ thống sau khi thực hiện Use-case: Mật khẩu cũ của tài khoản bị vô hiệu hóa, mật khẩu ngẫu nhiên mới được cập nhật vào cơ sở dữ liệu.
5. Use-case View Personal Information
5.1. Tóm tắt: Người dùng (Độc giả, Thủ thư, Quản trị viên) truy cập để xem chi tiết thông tin cá nhân và lịch sử hoạt động cá nhân trong hệ thống.
5.2. Dòng sự kiện:
5.2.1. Dòng sự kiện chính:
1.	Người dùng nhấp chọn chức năng "Trang cá nhân" hoặc "Xem thông tin tài khoản".
2.	Hệ thống kiểm tra vai trò của người dùng hiện tại và truy vấn chi tiết hồ sơ từ bảng tương ứng (Reader, Staff, hoặc Admin).
3.	Hệ thống hiển thị thông tin chi tiết: Họ tên, ngày sinh, SĐT, email, địa chỉ, ngày tạo tài khoản, và lịch sử mượn trả (đối với độc giả) hoặc lịch sử hoạt động ca trực (đối với thủ thư).
5.3. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Người dùng phải ở trạng thái đã đăng nhập vào hệ thống thành công.
6. Use-case View Registration Requests
6.1. Tóm tắt: Cho phép thủ thư hoặc quản trị viên duyệt xem danh sách các hồ sơ đăng ký độc giả trực tuyến đang ở trạng thái chờ duyệt.
6.2. Dòng sự kiện:
6.2.1. Dòng sự kiện chính:
1.	Thủ thư chọn chức năng "Duyệt yêu cầu đăng ký thẻ" trên bảng điều khiển.
2.	Hệ thống truy xuất cơ sở dữ liệu và hiển thị danh sách các hồ sơ đăng ký tài khoản độc giả đang có trạng thái "Pending Approval" theo thứ tự thời gian đăng ký mới nhất nằm trước.
3.	Thủ thư có thể nhấp vào từng hồ sơ để kiểm tra chi tiết các trường thông tin cá nhân và tài liệu đính kèm (nếu có).
6.3. Các yêu cầu đặc biệt: Danh sách hiển thị yêu cầu đăng ký phải được phân trang để tối ưu hóa hiệu suất tải trang khi số lượng yêu cầu lớn.
6.4. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Thủ thư hoặc Quản trị viên đang ở trạng thái đã đăng nhập thành công vào hệ thống.
6.5. Điểm mở rộng:
o	Use-case Approve Reader Card Issue: Thủ thư nhấp chọn duyệt một hồ sơ hợp lệ từ danh sách chờ để tiến hành cấp thẻ và kích hoạt tài khoản chính thức.
7. Use-case Approve Reader Card Issue
7.1. Tóm tắt: Phê duyệt một yêu cầu đăng ký tài khoản hợp lệ, kích hoạt thẻ thư viện và sinh mã QR định danh gửi cho độc giả.
7.2. Dòng sự kiện:
7.2.1. Dòng sự kiện chính:
1.	Thủ thư chọn hồ sơ độc giả cần phê duyệt từ danh sách yêu cầu chờ duyệt.
2.	Thủ thư nhấn nút "Phê duyệt cấp thẻ".
3.	Hệ thống tạo mã độc giả duy nhất (ReaderID) và tự động sinh mã vạch/mã QR định danh đại diện cho thẻ thư viện của độc giả.
4.	Hệ thống cập nhật trạng thái tài khoản độc giả từ "Pending Approval" sang "Active", thiết lập ngày bắt đầu và ngày hết hạn cho thẻ thư viện theo cấu hình quy định.
5.	Hệ thống gửi email xác nhận phê duyệt kèm hình ảnh mã QR thẻ thành viên về email độc giả.
6.	Hệ thống hiển thị thông báo phê duyệt thành công.
7.3. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Thủ thư đang ở giao diện xem chi tiết hồ sơ đăng ký của độc giả.
7.4. Trạng thái hệ thống sau khi thực hiện Use-case: Tài khoản độc giả chuyển sang trạng thái "Active" trong cơ sở dữ liệu, thẻ thư viện được kích hoạt thành công.
8. Use-case Search Books
8.1. Tóm tắt: Cho phép mọi đối tượng (Khách vãng lai, Độc giả, Thủ thư) tìm kiếm thông tin về tài liệu thư viện theo các tiêu chí đa dạng.
8.2. Dòng sự kiện:
8.2.1. Dòng sự kiện chính:
1.	Người dùng chọn chức năng tìm kiếm tài liệu trên thanh công cụ tìm kiếm.
2.	Người dùng nhập từ khóa tìm kiếm (Tựa sách, Tác giả, Thể loại, hoặc mã sách) và có thể tùy chọn bộ lọc nâng cao (Năm xuất bản, Nhà xuất bản, Ngôn ngữ).
3.	Hệ thống truy vấn cơ sở dữ liệu D2: Books & BookCopies để tìm kiếm các bản ghi chứa từ khóa tương ứng.
4.	Hệ thống hiển thị danh sách các kết quả tìm thấy gồm: Ảnh bìa, Tên sách, Tác giả, Thể loại, và số lượng bản sao khả dụng hiện có trên kệ thư viện.
5.	Người dùng có thể chọn sắp xếp danh sách kết quả (theo bảng chữ cái, ngày nhập, hoặc số lượt mượn) hoặc nhấn chọn xem chi tiết để xem tóm tắt nội dung và vị trí kệ sách.
8.3. Các yêu cầu đặc biệt: Kết quả tìm kiếm phải hiển thị tức thời (thời gian phản hồi dưới 2 giây đối với cơ sở dữ liệu lớn lên tới 100.000 đầu sách) và hỗ trợ tìm kiếm không dấu/gần đúng.
8.4. Điểm mở rộng:
o	Use-case Reserve Book: Độc giả có tài khoản chính thức có thể tiến hành đặt giữ chỗ sách từ giao diện chi tiết sách.
o	Use-case Add to Online Wishlist: Độc giả chọn lưu sách vào danh sách quan tâm cá nhân.
9. Use-case Reserve Book
9.1. Tóm tắt: Cho phép độc giả đã đăng nhập đặt giữ trước một bản sao sách đang khả dụng trên kệ trước khi đến thư viện mượn trực tiếp, tránh trường hợp sách bị người khác mượn mất.
9.2. Dòng sự kiện:
9.2.1. Dòng sự kiện chính:
1.	Độc giả chọn chức năng "Đặt giữ chỗ" tại trang thông tin chi tiết của cuốn sách muốn mượn.
2.	Hệ thống kiểm tra điều kiện tài khoản của độc giả: Tài khoản phải ở trạng thái "Active", thẻ thư viện không bị hết hạn, không có nợ phạt quá hạn chưa thanh toán, và tổng số lượng sách đang mượn cộng số sách đang đặt giữ chưa vượt quá giới hạn tối đa cho phép.
3.	Hệ thống kiểm tra sự khả dụng của bản sao sách vật lý trên kệ.
4.	Nếu đáp ứng đầy đủ điều kiện, hệ thống chuyển trạng thái của bản sao sách đó từ "Available" sang "Reserved" và thiết lập thời hạn tạm giữ chỗ (ví dụ: tối đa 24 giờ kể từ thời điểm đặt giữ).
5.	Hệ thống lưu thông tin đặt giữ chỗ và sinh mã xác nhận QR Code gửi về ứng dụng di động/email của độc giả.
9.2.2. Các dòng sự kiện khác:
o	Trường hợp tài khoản độc giả bị khóa hoặc thẻ hết hạn: Hệ thống từ chối thực hiện giao dịch và hiển thị thông báo lý do cụ thể.
o	Trường hợp độc giả đang giữ sách trễ hạn hoặc có nợ phạt chưa thanh toán: Hệ thống hiển thị thông báo từ chối đặt giữ chỗ và yêu cầu độc giả giải quyết nợ phạt tại quầy trước khi thực hiện giao dịch mới.
9.3. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Độc giả đang ở trạng thái đã đăng nhập và đang xem chi tiết thông tin cuốn sách muốn đặt giữ chỗ.
9.4. Trạng thái hệ thống sau khi thực hiện Use-case: Trạng thái bản sao cuốn sách được cập nhật thành "Reserved" trong cơ sở dữ liệu, ghi nhận lịch sử đặt giữ thành công.
10. Use-case Add to Online Wishlist
10.1. Tóm tắt: Cho phép độc giả lưu các tựa sách yêu thích hoặc cần tham khảo trong tương lai vào một danh sách cá nhân trực tuyến.
10.2. Dòng sự kiện:
10.2.1. Dòng sự kiện chính:
1.	Độc giả nhấn nút "Thêm vào danh sách quan tâm" tại trang chi tiết đầu sách.
2.	Hệ thống ghi nhận liên kết giữa ReaderID và BookID tương ứng.
3.	Hệ thống cập nhật danh sách Wishlist cá nhân trực tuyến của độc giả đó và hiển thị thông báo "Đã lưu vào danh sách quan tâm".
10.3. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Độc giả đã đăng nhập thành công vào hệ thống.
10.4. Trạng thái hệ thống sau khi thực hiện Use-case: Đầu sách được thêm thành công vào danh sách quan tâm cá nhân trực tuyến của độc giả.
11. Use-case Remove from Online Wishlist
11.1. Tóm tắt: Cho phép độc giả xóa bỏ các tựa sách không còn nhu cầu quan tâm ra khỏi danh sách wishlist cá nhân trực tuyến.
11.2. Dòng sự kiện:
11.2.1. Dòng sự kiện chính:
1.	Độc giả truy cập trang "Danh sách quan tâm của tôi".
2.	Hệ thống hiển thị toàn bộ danh sách các tựa sách đã lưu.
3.	Độc giả nhấn nút biểu tượng "Xóa" hoặc "Bỏ quan tâm" bên cạnh tựa sách tương ứng.
4.	Hệ thống xóa liên kết bản ghi lưu trữ tương ứng trong cơ sở dữ liệu.
5.	Hệ thống tải lại trang danh sách sau khi đã xóa và hiển thị thông báo cập nhật thành công.
11.3. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Độc giả đã đăng nhập thành công và đang ở giao diện xem danh sách quan tâm cá nhân.
11.4. Trạng thái hệ thống sau khi thực hiện Use-case: Tựa sách được loại bỏ thành công ra khỏi danh sách quan tâm cá nhân, trạng thái cơ sở dữ liệu được cập nhật.
12. Use-case Process Borrowing
12.1. Tóm tắt: Nghiệp vụ cốt lõi tại quầy cho phép thủ thư tiếp nhận yêu cầu, kiểm tra ràng buộc và lập phiếu mượn sách vật lý cho độc giả.
12.2. Dòng sự kiện:
o	12.2.1. Dòng sự kiện chính:
1.	Độc giả trình thẻ thư viện và sách cần mượn tại quầy dịch vụ.
2.	Thủ thư khởi động chức năng "Lập phiếu mượn sách" trên phần mềm.
3.	Thủ thư thực hiện quét mã QR/mã vạch thẻ thư viện của độc giả.
4.	Hệ thống tự động xác thực trạng thái thẻ thư viện (Verify Reader Card).
5.	Sau khi thẻ được xác nhận hợp lệ, thủ thư sử dụng máy quét mã vạch để quét mã vạch (CopyID) dán trên từng cuốn sách vật lý cần mượn.
6.	Hệ thống kiểm tra tính khả dụng của từng bản sao sách trong kho dữ liệu và đối chiếu các giới hạn mượn sách của độc giả (không được vượt quá số lượng sách quy định tối đa).
7.	Thủ thư kiểm tra thông tin hiển thị trên màn hình và nhấn "Xác nhận mượn".
8.	Hệ thống khởi tạo một giao dịch mượn mới trong DB: tạo bản ghi BorrowRecord (gồm ID giao dịch, mã độc giả, ngày mượn, mã thủ thư thực hiện) và tạo các bản ghi chi tiết BorrowDetail tương ứng với từng cuốn sách mượn (đặt DueDate là 14 ngày kể từ ngày mượn theo chính sách chung).
9.	Hệ thống cập nhật trạng thái của các bản sao sách trong bảng BookCopy từ "Available" sang "On borrow" và đồng thời trừ số lượng tồn kho sách khả dụng.
12.3. Các yêu cầu đặc biệt: Toàn bộ quá trình quét mã và xử lý giao dịch mượn sách phải đảm bảo tính toàn vẹn dữ liệu (sử dụng cơ chế Transaction để nếu một dòng mượn chi tiết lỗi thì rollback toàn bộ giao dịch để tránh rác dữ liệu). Thời gian phản hồi quét mã vạch phải dưới 1.5 giây.
12.4. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Thủ thư đã đăng nhập vào hệ thống thành công và đang làm việc tại màn hình lập phiếu mượn.
12.5. Trạng thái hệ thống sau khi thực hiện Use-case: Phiếu mượn được khởi tạo thành công, dữ liệu trạng thái sách và giới hạn của độc giả được cập nhật tức thời trong cơ sở dữ liệu.
12.6. Điểm mở rộng:
o	Use-case Print Receipt: Hệ thống tự động chuyển sang luồng in phiếu mượn vật lý để độc giả ký xác nhận sau khi giao dịch mượn hoàn thành.
13. Use-case Verify Reader Card
13.1. Tóm tắt: Hệ thống tự động rà soát, kiểm tra tính hợp lệ và các ràng buộc vi phạm của thẻ thư viện độc giả trước khi cho phép tiến hành các giao dịch lưu thông tiếp theo.
13.2. Dòng sự kiện:
13.2.1. Dòng sự kiện chính:
1.	Hệ thống nhận mã định danh ReaderID từ luồng xử lý mượn sách/gia hạn sách.
2.	Hệ thống kiểm tra thời hạn của thẻ độc giả (CardExpiryDate) so với ngày hiện tại.
3.	Hệ thống kiểm tra trạng thái hoạt động của thẻ trong DB (phải là "Active").
4.	Hệ thống đếm số lượng sách độc giả đang mượn thực tế chưa trả trong bảng BorrowDetail để đối chiếu với hạn mức mượn tối đa được phép theo phân loại đối tượng độc giả (Sinh viên, Giảng viên).
5.	Hệ thống kiểm tra xem độc giả có cuốn sách nào đang ở trạng thái mượn quá hạn (trễ ngày trả hẹn trước) hoặc đang có hóa đơn phạt vi phạm ở trạng thái chưa nộp tiền ("Pending Payment") hay không.
6.	Nếu tất cả đều hợp lệ, hệ thống trả về kết quả xác thực thành công và hiển thị thông tin tóm tắt của độc giả lên giao diện thủ thư.
13.2.2. Các dòng sự kiện khác:
o	Trường hợp thẻ hết hạn sử dụng hoặc bị khóa tạm thời: Hệ thống phát âm thanh cảnh báo và hiển thị thông báo lỗi chi tiết lý do từ chối lên màn hình của thủ thư. Use-case kết thúc.
o	Trường hợp độc giả đang giữ sách quá hạn hoặc có công nợ phạt chưa thanh toán: Hệ thống thông báo lỗi vi phạm chính sách lưu thông và chặn quyền mượn sách mới của độc giả đó cho đến khi giải quyết xong vi phạm.
13.3. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Hệ thống nhận được thông tin đầu vào là mã thẻ thư viện độc giả từ một tiến trình lưu thông.
14. Use-case View Borrowing History
14.1. Tóm tắt: Cho phép độc giả tra cứu lại toàn bộ lịch sử các giao dịch mượn trả tài liệu của mình thông qua tài khoản OPAC trực tuyến.
14.2. Dòng sự kiện:
14.2.1. Dòng sự kiện chính:
1.	Độc giả nhấp chọn chức năng "Lịch sử mượn sách" tại trang quản trị tài khoản cá nhân.
2.	Hệ thống truy vấn bảng BorrowRecord và BorrowDetail lọc theo mã ReaderID của độc giả đang đăng nhập.
3.	Hệ thống hiển thị danh sách toàn bộ các giao dịch mượn sách theo thứ tự thời gian từ mới nhất đến cũ nhất. Thông tin hiển thị cho từng cuốn sách bao gồm: Tên sách, Ngày mượn, Ngày hẹn trả, Ngày trả thực tế (nếu có), trạng thái sách (Đang mượn, Đã trả, Trả trễ hạn) và số tiền phạt phát sinh (nếu có).
14.3. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Độc giả đã đăng nhập thành công vào hệ thống.
14.4. Điểm mở rộng:
o	Use-case Renew Books Online: Độc giả có thể nhấp chọn nút "Gia hạn" trực tuyến ngay bên cạnh những đầu sách có trạng thái "Đang mượn" và đủ điều kiện gia hạn.
15. Use-case Renew Books Online
15.1. Tóm tắt: Độc giả tự thực hiện gia hạn thêm thời gian mượn sách trực tuyến qua giao diện ứng dụng di động/web mà không cần mang sách trực tiếp đến thư viện.
15.2. Dòng sự kiện:
15.2.1. Dòng sự kiện chính:
1.	Độc giả truy cập màn hình hiển thị danh sách sách đang mượn.
2.	Độc giả nhấn nút "Gia hạn trực tuyến" bên cạnh cuốn sách đang mượn muốn gia hạn.
3.	Hệ thống tự động tiến hành kiểm tra một loạt ràng buộc gia hạn:
o	Cuốn sách này không nằm trong danh sách đang được đặt giữ chỗ trước (Reserved) bởi một độc giả khác trong hệ thống.
o	Tài khoản của độc giả không bị khóa, không có bất kỳ sách nào khác đang mượn bị quá hạn và không có nợ phạt chưa thanh toán.
o	Số lần gia hạn thực tế của cuốn sách này chưa vượt quá hạn mức tối đa cho phép của thư viện (tối đa không quá 4 lần liên tiếp cho 1 đầu sách).
4.	Nếu đáp ứng đầy đủ điều kiện, hệ thống cập nhật ngày hẹn trả mới (DueDate) cho dòng chi tiết phiếu mượn tương ứng (ngày hẹn trả mới được cộng thêm 14 ngày kể từ ngày hẹn trả cũ), cập nhật số lần gia hạn tăng lên 1 đơn vị.
5.	Hệ thống hiển thị thông báo "Gia hạn thành công" kèm theo thông tin hiển thị ngày hẹn trả mới rõ ràng cho độc giả.
15.2.2. Các dòng sự kiện khác:
o	Trường hợp sách có người đặt giữ hoặc vi phạm các ràng buộc: Hệ thống hiển thị thông báo từ chối gia hạn kèm theo lý do cụ thể (ví dụ: "Sách đã có người đặt trước" hoặc "Bạn đã vượt quá số lần gia hạn cho phép"). Ngày hẹn trả cũ của sách giữ nguyên.
15.3. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Độc giả đã đăng nhập thành công và đang ở giao diện quản lý lịch sử sách đang mượn.
15.4. Trạng thái hệ thống sau khi thực hiện Use-case: Ngày hẹn trả của sách mượn được cập nhật lùi lại 14 ngày trong cơ sở dữ liệu, lịch sử giao dịch được ghi nhận trạng thái mới.
16. Use-case Over-the-Counter Renewal
16.1. Tóm tắt: Thủ thư tiếp nhận yêu cầu và xử lý gia hạn thời gian mượn sách trực tiếp cho độc giả tại quầy lưu thông.
16.2. Dòng sự kiện:
16.2.1. Dòng sự kiện chính:
1.	Độc giả mang sách hoặc thẻ đến quầy yêu cầu gia hạn ngày trả.
2.	Thủ thư quét thẻ thư viện độc giả để xác thực hồ sơ hoạt động.
3.	Thủ thư quét mã vạch của cuốn sách độc giả muốn gia hạn.
4.	Hệ thống thực hiện kiểm tra các ràng buộc nghiệp vụ tương tự quy trình online (cuốn sách không có người đặt giữ trước, độc giả không có sách quá hạn khác, số lần gia hạn chưa vượt quá 4 lần).
5.	Thủ thư nhấn nút "Xác nhận gia hạn tại quầy".
6.	Hệ thống thực hiện giao dịch cập nhật ngày hẹn trả mới dời thêm 14 ngày vào bảng BorrowDetail của cơ sở dữ liệu.
7.	Hệ thống thông báo kết quả gia hạn thành công lên màn hình thủ thư.
16.3. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Thủ thư đã đăng nhập và đang ở giao diện xử lý nghiệp vụ tại quầy.
16.4. Trạng thái hệ thống sau khi thực hiện Use-case: Ngày hẹn trả mới của cuốn sách được cập nhật thành công vào cơ sở dữ liệu.
16.5. Điểm mở rộng:
o	Use-case Print Receipt: Hệ thống in biên nhận xác nhận thời hạn trả mới để độc giả lưu trữ thông tin hạn trả.
17. Use-case Process Return
17.1. Tóm tắt: Thủ thư tiếp nhận sách vật lý từ độc giả mang trả tại quầy, cập nhật hoàn tất giao dịch mượn và rà soát các lỗi vi phạm phát sinh.
17.2. Dòng sự kiện:
17.2.1. Dòng sự kiện chính:
1.	Độc giả mang sách vật lý đến quầy lưu thông để làm thủ tục trả sách.
2.	Thủ thư khởi động màn hình "Nhận trả sách" trên phần mềm.
3.	Thủ thư quét mã vạch (CopyID) dán trên cuốn sách vật lý.
4.	Hệ thống tự động truy vấn tìm kiếm bản ghi chi tiết mượn sách (BorrowDetail) đang ở trạng thái mở tương ứng với mã vạch sách vừa quét để lấy thông tin ReaderID, DateBorrow và DueDate.
5.	Thủ thư tiến hành kiểm tra thực tế thể chất cuốn sách (soi các trang sách xem có bị rách, viết bẩn, vẽ bậy, mất trang hoặc rách bìa hay không).
6.	Thủ thư chọn ghi nhận trạng thái sách thực tế khi trả vào phần mềm (ví dụ: "Nguyên vẹn", "Rách bìa", "Mất trang", "Mất sách").
7.	Hệ thống cập nhật trường ngày trả thực tế (Actual return date) bằng ngày hiện tại vào bảng BorrowDetail.
8.	Hệ thống cập nhật trạng thái của bản sao cuốn sách trong bảng BookCopy từ "On borrow" quay trở lại trạng thái "Available", đồng thời cập nhật tăng số lượng tồn kho khả dụng trên kệ của đầu sách đó.
9.	Hệ thống xóa cuốn sách đã trả khỏi danh sách sách đang mượn nợ hiện hành của độc giả.
17.3. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Thủ thư đã đăng nhập thành công và đang hoạt động tại giao diện xử lý nhận sách trả.
17.4. Trạng thái hệ thống sau khi thực hiện Use-case: Giao dịch trả sách được ghi nhận, trạng thái sách vật lý trong kho được phục hồi về khả dụng cho lượt mượn tiếp theo.
17.5. Điểm mở rộng:
o	Use-case Issue Fine Ticket: Tự động kích hoạt khi hệ thống đối chiếu ngày trả thực tế trễ hơn so với ngày hẹn trả (DueDate), hoặc khi thủ thư chọn ghi nhận sách trả bị rách hỏng, mất trang hoặc làm mất sách.
o	Use-case Print Receipt: Hệ thống tự động in phiếu xác nhận trả sách thành công cho độc giả sau khi hoàn thành.
18. Use-case Issue Fine Ticket
18.1. Tóm tắt: Khởi tạo phiếu phạt vi phạm quy chế thư viện khi độc giả trả sách trễ hạn, làm hỏng sách hoặc làm mất sách, đồng thời áp đặt hình thức chế tài xử lý.
18.2. Dòng sự kiện:
18.2.1. Dòng sự kiện chính:
1.	Hệ thống tự động tính toán số ngày trả trễ hạn (nếu có): OverdueDays = ActualReturnDate - DueDate.
2.	Hệ thống áp dụng quy tắc tính tiền phạt tự động theo chính sách thư viện để ra số tiền phạt cụ thể (ví dụ: 5.000 VNĐ cho mỗi ngày trễ hạn).
3.	Đối với các trường hợp sách bị hư hỏng vật chất (rách bìa, vẽ bậy, mất trang, mất sách) do thủ thư nhập vào, hệ thống áp dụng đơn giá đền bù theo khung quy định.
4.	Hệ thống tự động khởi tạo một bản ghi phiếu phạt mới vào bảng FineReceipt gồm: Mã phiếu phạt (FineID), Mã giao dịch mượn gốc, Nội dung lỗi vi phạm chi tiết, Tổng số tiền phạt phát sinh, ngày khởi tạo và thiết lập trạng thái hóa đơn phạt là "Pending Payment" (Chờ thanh toán).
5.	Hệ thống tự động cập nhật trạng thái tài khoản thẻ độc giả trong bảng Reader thành trạng thái "Temporarily Suspended" (Tạm khóa tài khoản) để chặn toàn bộ quyền mượn sách hoặc gia hạn tiếp theo cho đến khi hoàn tất nộp tiền phạt.
6.	Hệ thống hiển thị thông tin phiếu phạt chi tiết lên màn hình thủ thư và gửi thông báo nhắc nợ phạt qua email/app độc giả.
18.3. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Hệ thống phát hiện lỗi vi phạm thời hạn hoặc tình trạng sách trong tiến trình nhận sách trả tại quầy.
18.4. Trạng thái hệ thống sau khi thực hiện Use-case: Phiếu phạt vi phạm được ghi nhận thành công vào DB ở trạng thái chờ thanh toán, tài khoản độc giả bị tạm khóa an toàn trên toàn hệ thống.
18.5. Điểm mở rộng:
o	Use-case Collect Fine Payment: Thủ thư tiến hành thu tiền phạt trực tiếp từ độc giả tại quầy mượn trả để giải tỏa công nợ phạt.
19. Use-case Collect Fine Payment
19.1. Tóm tắt: Tiếp nhận thanh toán tiền phạt của độc giả vi phạm, cập nhật trạng thái hóa đơn đã thanh toán và khôi phục quyền hoạt động cho thẻ độc giả.
19.2. Dòng sự kiện:
19.2.1. Dòng sự kiện chính:
1.	Độc giả nộp tiền mặt trực tiếp tại quầy hoặc thực hiện chuyển khoản.
2.	Thủ thư tìm kiếm mã phiếu phạt của độc giả trên phần mềm quản lý công nợ phạt.
3.	Thủ thư kiểm tra số tiền cần thu và nhấn nút "Xác nhận đã thu tiền phạt".
4.	Hệ thống thực hiện cập nhật trạng thái phiếu phạt trong bảng FineReceipt từ "Pending Payment" chuyển sang trạng thái "Paid" (Đã thanh toán) và ghi nhận ngày thanh toán thực tế cùng mã thủ thư xử lý.
5.	Hệ thống tự động kiểm tra xem độc giả còn phiếu phạt nào khác chưa thanh toán không. Nếu độc giả đã hoàn tất sạch nợ phạt, hệ thống tự động giải khóa trạng thái thẻ của độc giả trong bảng Reader từ "Temporarily Suspended" quay trở lại trạng thái hoạt động bình thường "Active".
6.	Hệ thống hiển thị thông báo cập nhật thanh toán thành công.
19.3. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Độc giả đang có phiếu phạt trạng thái chưa nộp tiền và thủ thư đã chọn đúng phiếu phạt cần xử lý.
19.4. Trạng thái hệ thống sau khi thực hiện Use-case: Trạng thái phiếu phạt được cập nhật thành "Paid" trong DB, tài khoản độc giả được giải khóa khôi phục quyền mượn sách bình thường.
19.5 Điểm mở rộng:
o	Use-case Print Receipt: Hệ thống in biên lai thu tiền phạt tài chính giao cho độc giả làm chứng từ đối chiếu.
20. Use-case Print Receipt
20.1. Tóm tắt: In biên nhận vật lý tại quầy để làm chứng từ xác nhận hoàn thành giao dịch (Phiếu mượn sách, Phiếu trả sách, Biên lai thu tiền phạt) giao cho độc giả.
20.2. Dòng sự kiện:
20.2.1. Dòng sự kiện chính:
1.	Sau khi một giao dịch lưu thông (mượn sách, trả sách hoặc thu tiền phạt) được xác nhận thành công trên hệ thống.
2.	Hệ thống gửi dữ liệu định dạng hóa đơn chuẩn (chứa thông tin mã giao dịch, họ tên độc giả, danh sách sách/lỗi vi phạm, số tiền, ngày giờ thực hiện, tên thủ thư) tới máy in nhiệt chuyên dụng kết nối tại quầy.
3.	Máy in xuất bản biên nhận vật lý thành công cho độc giả và ghi nhận sự kiện in chứng từ vào file nhật ký hệ thống.
20.3. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Giao dịch lưu thông tương ứng đã được ghi nhận thành công và ghi vào DB.
21. Use-case Manage Book Catalog
21.1. Tóm tắt: Cho phép thủ thư và quản trị viên quản lý vòng đời dữ liệu sách và tài liệu thư viện, bao gồm các chức năng Thêm mới, Cập nhật thông tin và Xóa sách.
21.2. Dòng sự kiện:
21.2.1. Dòng sự kiện chính:
1.	Người dùng chọn chức năng "Quản lý danh mục sách" trên giao diện hệ thống.
2.	Hệ thống hiển thị toàn bộ danh sách các đầu sách hiện có kèm công cụ lọc tìm kiếm nâng cao.
3.	Người dùng có thể chọn một trong các hành động sau:
o	Thêm đầu sách mới: Nhập thông tin Metadata của sách (Tên sách, năm xuất bản, thông tin tác giả, nhà xuất bản, thể loại). Hệ thống kiểm tra trùng lặp thông tin, sau đó thêm dữ liệu mới vào bảng Book, tự động tạo mã bản sao (CopyID) và in nhãn dán mã vạch.
o	Cập nhật sách: Chọn đầu sách cần sửa, tiến hành chỉnh sửa thông tin xuất bản hoặc số lượng tồn kho khả dụng trên kệ, sau đó nhấn xác nhận để hệ thống lưu đè thông tin mới vào DB.
o	Xóa sách: Chọn đầu sách/bản sao vật lý cần xóa (do rách nát, lỗi thời cần thanh lý), hệ thống yêu cầu xác nhận thao tác xóa.
21.2.2. Các dòng sự kiện khác:
o	Trường hợp xóa sách bị vướng lỗi ràng buộc khóa ngoại: Nếu người dùng chọn xóa một cuốn sách đã từng có lịch sử mượn trả được lưu trữ trong quá khứ, hệ thống phát hiện ràng buộc khóa ngoại (RESTRICT từ bảng mượn chi tiết) sẽ ngăn chặn hành vi xóa vật lý để tránh phá vỡ tính toàn vẹn dữ liệu. Hệ thống sẽ hiển thị thông báo lỗi cảnh báo và tự động hướng dẫn người dùng chuyển trạng thái của cuốn sách đó sang trạng thái "Liquidation" (Xóa mềm - Soft Delete) để ẩn khỏi OPAC nhưng vẫn bảo toàn lịch sử giao dịch.
21.3. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Thủ thư hoặc Admin ở trạng thái đăng nhập hệ thống thành công và có quyền hạn quản lý danh mục tài liệu.
21.4. Trạng thái hệ thống sau khi thực hiện Use-case: Cơ sở dữ liệu danh mục sách D2: Books & BookCopies được cập nhật, ghi nhận thông tin sửa đổi thành công.
22. Use-case Manage Reader Accounts
22.1. Tóm tắt: Cho phép thủ thư và quản trị viên quản lý thông tin lý lịch độc giả, phê duyệt sửa đổi hồ sơ và kiểm soát trạng thái kích hoạt/khóa thẻ của độc giả.
22.2. Dòng sự kiện:
o	22.2.1. Dòng sự kiện chính:
1.	Người dùng truy cập chức năng "Quản lý tài khoản độc giả" trên phần mềm quản trị.
2.	Hệ thống hiển thị danh sách toàn bộ độc giả trong cơ sở dữ liệu kèm theo các bộ lọc trạng thái tài khoản ("Active", "Pending", "Suspended").
3.	Người dùng thực hiện các hành động quản lý:
o	Cập nhật hồ sơ: Sửa đổi thông tin liên lạc (địa chỉ thường trú, số điện thoại, email) theo yêu cầu đổi thông tin của độc giả, gia hạn thời hạn hiệu lực của thẻ thư viện.
o	Khóa tài khoản thủ công: Chủ động chuyển trạng thái độc giả sang "Locked" (khóa thẻ) đối với các trường hợp độc giả vi phạm nghiêm trọng nội quy thư viện, báo mất thẻ hoặc có yêu cầu ngừng sử dụng dịch vụ.
o	Mở khóa tài khoản: Chuyển trạng thái độc giả về "Active" sau khi độc giả giải quyết xong các vi phạm chính sách hoặc hoàn tất đóng phạt.
22.3. Các yêu cầu đặc biệt: Toàn bộ danh sách độc giả hiển thị phải được phân trang đầy đủ để đảm bảo tối ưu hóa tốc độ truy vấn cơ sở dữ liệu.
22.4. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Người dùng đã đăng nhập hệ thống thành công và sở hữu phân quyền quản trị tài khoản độc giả.
22.5. Trạng thái hệ thống sau khi thực hiện Use-case: Cơ sở dữ liệu thông tin độc giả D1: Readers được cập nhật trạng thái mới thành công.
23. Use-case Manage Staff Accounts
23.1. Tóm tắt: Tính năng đặc quyền cao của Quản trị viên (Admin) dùng để quản lý hồ sơ nhân sự, cấp phát tài khoản tác vụ và phân quyền hoạt động cho các nhân viên thủ thư.
23.2. Dòng sự kiện:
23.2.1. Dòng sự kiện chính:
1.	Quản trị viên (Admin) đăng nhập hệ thống và chọn chức năng "Quản lý tài khoản nhân viên".
2.	Hệ thống hiển thị danh sách các nhân viên thủ thư hiện tại kèm chi tiết chức vụ và bộ phận làm việc.
3.	Admin tiến hành các thao tác:
o	Cấp tài khoản mới: Nhập thông tin lý lịch nhân sự (Họ tên, ngày sinh, giới tính, CCCD, chức vụ, lương cơ bản) và cấp tên đăng nhập cùng mật khẩu khởi tạo hệ thống.
o	Phân quyền vai trò (Role Assignment): Gán quyền hạn tác vụ cụ thể cho nhân viên (ví dụ: gán quyền Thủ thư lưu thông tại quầy, Thủ thư quản lý kho tài liệu catalog, hoặc Thủ thư thống kê báo cáo tài chính).
o	Vô hiệu hóa tài khoản: Chuyển trạng thái tài khoản thủ thư sang "Inactive" hoặc xóa tài khoản khi nhân sự nghỉ việc để thu hồi toàn bộ quyền truy cập vào hệ thống thư viện.
23.3. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Quản trị viên đang đăng nhập hệ thống với quyền hạn tối cao (Admin).
23.4. Trạng thái hệ thống sau khi thực hiện Use-case: Cơ sở dữ liệu nhân sự thủ thư D5: Staffs được cập nhật chính xác, mọi thay đổi phân quyền lập tức có hiệu lực ở phiên đăng nhập tiếp theo.
24. Use-case Statistics & Reports
24.1. Tóm tắt: Hỗ trợ kết xuất các số liệu thống kê chi tiết, trực quan hóa biểu đồ hoạt động lưu thông sách và báo cáo tài chính phạt phục vụ ban quản trị thư viện.
24.2. Dòng sự kiện:
24.2.1. Dòng sự kiện chính:
1.	Người dùng (Staff hoặc Admin) chọn chức năng "Thống kê & Báo cáo" trên màn hình quản lý.
2.	Người dùng lựa chọn loại báo cáo mong muốn:
o	Báo cáo lưu thông mượn trả hàng ngày/hàng tuần (Thủ thư thường dùng).
o	Danh sách sách bị mượn quá hạn chưa trả.
o	Báo cáo tài chính doanh thu thu phạt vi phạm (Admin dùng).
o	Thống kê tần suất mượn sách theo từng thể loại để hỗ trợ mua sắm tư liệu mới.
3.	Người dùng thiết lập cấu hình khoảng thời gian lọc số liệu cần kết xuất báo cáo.
4.	Hệ thống tiến hành truy vấn dữ liệu từ tất cả các kho dữ liệu (D1, D2, D3, D4), tiến hành tính toán các chỉ số thống kê (KPI) và hiển thị bảng biểu số liệu trực quan lên màn hình.
5.	Người dùng có thể chọn chức năng "Xuất báo cáo" dưới định dạng file chuẩn PDF hoặc bảng tính Excel để in ấn, chia sẻ hoặc lưu trữ lưu hồ sơ.
24.3. Các yêu cầu đặc biệt: Tiến trình thống kê dữ liệu chỉ hoạt động dưới cơ chế Đọc dữ liệu (Read-only), tuyệt đối không thực hiện bất kỳ thao tác ghi đè hay thay đổi trạng thái dữ liệu tĩnh của các bảng trong DB để đảm bảo tính an toàn dữ liệu tuyệt đối.
24.4. Trạng thái hệ thống trước khi bắt đầu thực hiện Use-case: Người dùng đã đăng nhập thành công và sở hữu phân quyền xem báo cáo thống kê tương ứng.




  	 
