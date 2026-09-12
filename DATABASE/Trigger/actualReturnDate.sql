DELIMITER //

DROP TRIGGER IF EXISTS before_update_borrowdetail_return //
CREATE TRIGGER before_update_borrowdetail_return
BEFORE UPDATE ON BorrowDetail
FOR EACH ROW
BEGIN
    IF NEW.actualReturnDate IS NOT NULL AND OLD.actualReturnDate IS NULL THEN
        IF NEW.actualReturnDate > NEW.dueDate THEN
            SET NEW.status = 'Overdue';
        ELSE
            SET NEW.status = 'Returned';
        END IF;
    END IF;
END; //

DROP TRIGGER IF EXISTS after_update_borrowdetail_return_actions //
CREATE TRIGGER after_update_borrowdetail_return_actions
AFTER UPDATE ON BorrowDetail
FOR EACH ROW
BEGIN
   
    DECLARE fineExists INT;

    IF NEW.actualReturnDate IS NOT NULL AND OLD.actualReturnDate IS NULL THEN
        -- 1. Cập nhật trạng thái sách
        UPDATE BookCopy
        SET status = 'Available'
        WHERE copyID = NEW.copyID AND status NOT IN ('Lost');

        -- 2. Tạo phiếu phạt nếu trễ hạn
        IF NEW.actualReturnDate > NEW.dueDate THEN
            SELECT COUNT(*) INTO fineExists FROM FineReceipt WHERE borrowDetailID = NEW.borrowDetailID;
            IF fineExists = 0 THEN
                INSERT INTO FineReceipt (
                    borrowDetailID,
                    reason,
                    amount
                ) VALUES (
                    NEW.borrowDetailID,
                    CONCAT('Trả sách trễ hạn ', DATEDIFF(NEW.actualReturnDate, NEW.dueDate), ' ngày'),
                    DATEDIFF(NEW.actualReturnDate, NEW.dueDate) * 5000
                );
            END IF;
        END IF;

        -- 3. Cập nhật BorrowRecord
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
