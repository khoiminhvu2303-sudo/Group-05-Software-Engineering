DELIMITER //

CREATE TRIGGER before_insert_borrowdetail
BEFORE INSERT ON BorrowDetail
FOR EACH ROW
BEGIN
    DECLARE borrowDate DATE;
    -- Lấy ngày mượn từ BorrowRecord
    SELECT DATE(borrowDate) INTO borrowDate
    FROM BorrowRecord
    WHERE borrowID = NEW.borrowID;

    -- Gán dueDate mặc định = borrowDate + 14 ngày (FR3.2)
    SET NEW.dueDate = DATE_ADD(borrowDate, INTERVAL 14 DAY);
END; //

DELIMITER ;

DELIMITER //

CREATE TRIGGER after_insert_borrowdetail
AFTER INSERT ON BorrowDetail
FOR EACH ROW
BEGIN
    -- Cập nhật trạng thái bản sao thành 'On loan'
    UPDATE BookCopy
    SET status = 'On loan'
    WHERE copyID = NEW.copyID;
END; //

DELIMITER ;
