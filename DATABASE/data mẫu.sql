USE LIBRARY_MANAGEMENT_SYSTEM;

INSERT INTO Administrator (AdminID, AdminName, Email, Phone, CCCD, Salary, NameLogin_Admin, Password_Admin) VALUES
('ADM001', 'Phan Trung Kiên', 'admin@library.vn', '0909123456', '079206003013', 18000000.00, 'admin@library.vn', '123456');

INSERT INTO Staff (StaffID, StaffName, Gender, Birthday_Staff, Numberphone, Address, CCCD, Salary, NameLogin_Staff, Password_Staff, ManagedByAdminID) VALUES
('NV001', 'Trần Văn Lâm', 'Nam', '1995-04-12', '0912345678', 'Ho Chi Minh City', '075207011378', 10000000, 'thuthu@library.vn', '123456', 'ADM001'),
('NV002', 'Nguyễn Thị Mai', 'Nữ', '1998-08-20', '0923456789', 'Ho Chi Minh City', '079207018158', 9500000, 'mainguyen@library.vn', '123456', 'ADM001'),
('NV003', 'Trương Bá Khang', 'Nam', '1996-11-05', '0934567890', 'Ho Chi Minh City', '079207043105', 9800000, 'khang.tb@library.vn', '123456', 'ADM001');

INSERT INTO Reader (ReaderID, FullName, DOB, Phone, Gender, Email, Address, CCCD, StartDate, ExpiryDate, Username, Password, Status) VALUES
('RD00000001', N'Phạm Minh Tuấn', '2001-05-15', '0987654321', N'Nam', 'tuan.pm@gmail.com', N'Q.1, TP.HCM', '079201012345', '2024-01-01', '2027-01-01', 'tuanpm', '123456', 'Active'),
('RD00000002', N'Lê Thị Thu Hà', '1999-12-10', '0976543210', N'Nữ', 'ha.le@gmail.com', N'Q.3, TP.HCM', '079301054321', '2024-01-01', '2027-01-01', 'hale', '123456', 'Active'),
('DG001', N'Nguyễn Văn An', '2002-03-22', '0965432109', N'Nam', 'an.nguyen@gmail.com', N'Q. Bình Thạnh, TP.HCM', '079202098765', '2024-01-10', '2027-01-10', 'annguyen', '123456', 'Active'),
('DG002', N'Trần Thị Bích', '2000-09-08', '0954321098', N'Nữ', 'bich.tran@gmail.com', N'Q. Tân Bình, TP.HCM', '079300067890', '2024-01-10', '2027-01-10', 'bichtran', '123456', 'Active');

INSERT INTO Author (AuthorID, AuthorName, Note, Birthday, Deathday) VALUES
('AUT001', 'Dale Carnegie', 'Tác giả cuốn Đắc Nhân Tâm', '1888-11-24', '1955-11-01'),
('AUT002', 'Paulo Coelho', 'Tác giả cuốn Nhà Giả Kim', '1947-08-24', NULL),
('AUT003', 'Yuval Noah Harari', 'Tác giả cuốn Sapiens: Lược Sử Loài Người', '1976-02-24', NULL),
('AUT004', 'James Clear', 'Tác giả cuốn Atomic Habits', '1986-01-22', NULL);

INSERT INTO Publisher (PublisherID, Name, Address, Phone, Email, Website) VALUES
('PUB0000001', N'NXB Trẻ', N'161 Lý Chính Thắng, P. Võ Thị Sáu, Q.3, TP.HCM', '0283931629', 'nxbtre@nxbtre.com.vn', 'https://www.nxbtre.com.vn'),
('PUB0000002', N'NXB Nhã Nam', N'59 Đỗ Quang, Trung Hoà, Cầu Giấy, Hà Nội', '0243514686', 'bookstore@nhanam.vn', 'https://nhanam.vn'),
('PUB0000003', N'NXB Kim Đồng', N'55 Quang Trung, Nguyễn Du, Hai Bà Trưng, Hà Nội', '0239434730', 'info@nxbkimdong.com.vn', 'https://nxbkimdong.com.vn');

INSERT INTO Category (CategoryID, CategoryName) VALUES
('CAT0000001', N'Kỹ năng sống'),
('CAT0000002', N'Văn học'),
('CAT0000003', N'Lịch sử - Sách khoa học');

INSERT INTO Book (BookID, Title, `Describe`, Publication, Stockquantity, Status, AuthorID, PublisherID, CategoryID) VALUES
('B000000001', N'Đắc Nhân Tâm', N'Sách kỹ năng sống', '2020-01-01', 10, 'Available', 'AUT001', 'PUB0000001', 'CAT0000001'),
('B000000002', N'Nhà Giả Kim', N'Tiểu thuyết văn học', '2021-03-15', 5, 'Available', 'AUT002', 'PUB0000002', 'CAT0000002'),
('B000000003', N'Sapiens', N'Lược sử loài người', '2019-05-20', 8, 'Available', 'AUT003', 'PUB0000002', 'CAT0000003'),
('BK00000002', N'Đắc Nhân Tâm (Bản mới)', N'Tái bản mới', '2022-01-01', 5, 'Available', 'AUT001', 'PUB0000001', 'CAT0000001'),
('BK00000005', N'Atomic Habits', N'Thói quen nguyên tử', '2021-08-10', 3, 'Available', 'AUT004', 'PUB0000002', 'CAT0000001'),
('BK00000010', N'Lược Sử Tương Lai', N'Khoa học lịch sử', '2020-11-11', 4, 'Available', 'AUT003', 'PUB0000003', 'CAT0000003');

INSERT INTO BookCopy (CopyID, BookID, Barcode, Status, `Condition`, Price, CreatedAt, UpdatedAt) VALUES 
('CP00000001', 'B000000001', 'BC-MB-001', 'Available', N'Mới', 110000.00, '2024-01-15 08:30:00', '2024-01-15 08:30:00'),
('CP00000002', 'B000000001', 'BC-MB-002', 'Borrowed', N'Cũ nhẹ', 110000.00, '2024-01-15 08:30:00', '2024-02-10 14:20:00'),
('CP00000003', 'B000000002', 'BC-TV-001', 'Reserved', N'Mới', 85000.00, '2024-02-01 09:00:00', '2024-02-05 10:15:00'),
('CP00000004', 'B000000003', 'BC-HP-001', 'Available', N'Mới', 250000.00, '2024-02-15 11:45:00', '2024-02-15 11:45:00');

INSERT INTO WishList (WishListID, ReaderID, BookID, AddedData, Note) VALUES
('WL00000001', 'RD00000001', 'BK00000002', '2026-08-15 09:30:00', 'Muốn đọc bản tiếng Việt mới tái bản'),
('WL00000002', 'RD00000002', 'BK00000005', '2026-08-20 14:15:00', 'Sách đang hết lượt mượn, chờ thông báo'),
('WL00000003', 'RD00000001', 'BK00000010', '2026-09-01 10:05:00', 'Cần mượn làm tài liệu tham khảo bài luận');

INSERT INTO Reservation (ReservationID, ReaderID, CopyID, ReservationDate, ExpiryDate, Status, QRCode, Note) VALUES 
('RS00000001', 'DG001', 'CP00000001', '2024-01-14 09:30:00', '2024-01-15 09:30:00', 'Pending', 'QR_RS00000001_DATA', N'Đặt giữ sách trước 2 ngày'),
('RS00000002', 'DG002', 'CP00000002', '2024-01-13 10:30:00', '2024-01-14 10:30:00', 'Completed', 'QR_RS00000002_DATA', N'Đã nhận sách tại quầy');


INSERT INTO BorrowRecord (ReaderID, StaffID, BorrowDate, Status) VALUES
('RD00000001', 'NV001', '2026-01-01 09:00:00', 'Active');
SET @borrow1 = LAST_INSERT_ID();

INSERT INTO BorrowRecord (ReaderID, StaffID, BorrowDate, Status) VALUES
('RD00000002', 'NV002', '2026-02-01 10:30:00', 'Active');
SET @borrow2 = LAST_INSERT_ID();

INSERT INTO BorrowRecord (ReaderID, StaffID, BorrowDate, Status) VALUES
('DG001', 'NV001', '2026-03-01 14:00:00', 'Active');
SET @borrow3 = LAST_INSERT_ID();

INSERT INTO BorrowRecord (ReaderID, StaffID, BorrowDate, Status) VALUES
('DG002', 'NV003', '2026-04-01 08:15:00', 'Completed');
SET @borrow4 = LAST_INSERT_ID();

INSERT INTO BorrowDetail (BorrowID, CopyID, DueDate, ActualReturnDate, RenewalCount, ReturnCondition, Status)
VALUES (@borrow1, 'CP00000001', '2026-01-15', '2026-01-14', 0, 'Good', 'Returned');
SET @bd1 = LAST_INSERT_ID();

INSERT INTO BorrowDetail (BorrowID, CopyID, DueDate, ActualReturnDate, RenewalCount, ReturnCondition, Status)
VALUES (@borrow1, 'CP00000002', '2026-01-15', '2026-01-20', 0, 'Good', 'Overdue');
SET @bd2 = LAST_INSERT_ID();

INSERT INTO BorrowDetail (BorrowID, CopyID, DueDate, ActualReturnDate, RenewalCount, ReturnCondition, Status)
VALUES (@borrow2, 'CP00000004', '2026-02-15', '2026-02-10', 0, 'Damaged', 'Returned');
SET @bd3 = LAST_INSERT_ID();

INSERT INTO BorrowDetail (BorrowID, CopyID, DueDate, ActualReturnDate, RenewalCount, ReturnCondition, Status)
VALUES (@borrow3, 'CP00000003', '2026-03-15', NULL, 0, 'Lost', 'Overdue');
SET @bd4 = LAST_INSERT_ID();

INSERT INTO BorrowDetail (BorrowID, CopyID, DueDate, ActualReturnDate, RenewalCount, ReturnCondition, Status)
VALUES (@borrow4, 'CP00000001', '2026-04-15', '2026-04-25', 0, 'Good', 'Overdue');
SET @bd6 = LAST_INSERT_ID();



INSERT INTO DetailFineReceipt (BorrowDetailID, StaffID, Reason, Amount, IssuedDate, PaidDate, Status)
VALUES (@bd2, NULL, 'Trả sách trễ hạn 5 ngày', 25000.00, '2026-01-20 10:00:00', NULL, 'Pending');

INSERT INTO DetailFineReceipt (BorrowDetailID, StaffID, Reason, Amount, IssuedDate, PaidDate, Status)
VALUES (@bd3, NULL, 'Sách bị hỏng (rách bìa, ố vàng)', 50000.00, '2026-02-10 11:00:00', NULL, 'Pending');

INSERT INTO DetailFineReceipt (BorrowDetailID, StaffID, Reason, Amount, IssuedDate, PaidDate, Status)
VALUES (@bd4, NULL, 'Mất sách - đền bù theo giá bìa', 120000.00, '2026-02-12 09:30:00', NULL, 'Pending');

INSERT INTO DetailFineReceipt (BorrowDetailID, StaffID, Reason, Amount, IssuedDate, PaidDate, Status)
VALUES (@bd6, 'NV001', 'Trả sách trễ hạn 10 ngày', 50000.00, '2026-04-25 15:00:00', '2026-04-26 09:00:00', 'Paid');

INSERT INTO FineReceipt (FineID, BorrowID, Note, Amount, PaymentStatus) VALUES
('FR00000001', 1, 'Phạt trễ hạn trả sách 3 ngày', 15000.00, 'Paid'),
('FR00000002', 2, 'Phạt làm hỏng trang sách 12-15', 50000.00, 'Unpaid'),
('FR00000003', 3, 'Phạt trễ hạn trả sách 7 ngày', 35000.00, 'Unpaid');

INSERT INTO Auditlog (LogID, UserID, UserRole, Action, TableName, Description, CreatedAt) VALUES
(1, 'RD00000001', 'Reader', 'CREATE_RESERVATION', 'Reservation', 'Độc giả đặt trước sách BK00000002', '2026-09-01 08:30:00'),
(2, 'NV001', 'Staff', 'UPDATE_FINE', 'FineReceipt', 'Xác nhận thanh toán biên lai FR00000001', '2026-09-02 11:20:00'),
(3, 'ADM001', 'Admin', 'ADD_STAFF', 'Staff', 'Thêm nhân viên mới vào hệ thống', '2026-09-05 16:45:00');
