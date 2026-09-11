DELIMITER //

CREATE TRIGGER after_update_bookcopy_status
AFTER UPDATE ON BookCopy
FOR EACH ROW
BEGIN
    -- Khi status thay đổi, cập nhật tổng số và số có sẵn
    DECLARE total INT DEFAULT 0;
    DECLARE avail INT DEFAULT 0;

    SELECT COUNT(*) INTO total FROM BookCopy WHERE bookID = NEW.bookID;
    SELECT COUNT(*) INTO avail FROM BookCopy WHERE bookID = NEW.bookID AND status = 'Available';

    UPDATE Book
    SET totalCopies = total,
        availableCopies = avail
    WHERE bookID = NEW.bookID;
END; //

DELIMITER ;

DELIMITER //

CREATE TRIGGER after_update_borrowdetail_return_actions
AFTER UPDATE ON BorrowDetail
FOR EACH ROW
BEGIN
    -- Chỉ xử lý khi actualReturnDate vừa được set
    IF NEW.actualReturnDate IS NOT NULL AND OLD.actualReturnDate IS NULL THEN
        -- 1. Cập nhật trạng thái sách thành Available (nếu chưa bị mất/hỏng)
        --    Nếu sách bị Lost thì status đã được đặt riêng, không cần cập nhật
        UPDATE BookCopy
        SET status = 'Available'
        WHERE copyID = NEW.copyID AND status NOT IN ('Lost');

        -- 2. Nếu trễ hạn => tạo phiếu phạt (nếu chưa có)
        IF NEW.actualReturnDate > NEW.dueDate THEN
            DECLARE fineExists INT;
            SELECT COUNT(*) INTO fineExists FROM FineReceipt WHERE borrowDetailID = NEW.borrowDetailID;
            IF fineExists = 0 THEN
                INSERT INTO FineReceipt (
                    borrowDetailID,
                    reason,
                    amount
                ) VALUES (
                    NEW.borrowDetailID,
                    CONCAT('Trả sách trễ hạn ', DATEDIFF(NEW.actualReturnDate, NEW.dueDate), ' ngày'),
                    DATEDIFF(NEW.actualReturnDate, NEW.dueDate) * 5000   -- 5.000 VND/ngày theo chính sách
                );
            END IF;
        END IF;

        -- 3. Kiểm tra tất cả BorrowDetail của BorrowRecord đã trả chưa
        --    Nếu tất cả đều có actualReturnDate NOT NULL => đánh dấu BorrowRecord là Completed
        IF NOT EXISTS (
            SELECT 1 FROM BorrowDetail
            WHERE borrowID = NEW.borrowID AND actualReturnDate IS NULL
        ) THEN
            UPDATE BorrowRecord
            SET status = 'Completed'
            WHERE borrowID = NEW.borrowID;
        END IF;
    END IF;
END; //

DELIMITER ;
