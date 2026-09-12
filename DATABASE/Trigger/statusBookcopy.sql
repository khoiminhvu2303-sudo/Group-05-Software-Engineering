DELIMITER //

DROP TRIGGER IF EXISTS after_update_bookcopy_status //
CREATE TRIGGER after_update_bookcopy_status
AFTER UPDATE ON BookCopy
FOR EACH ROW
BEGIN
    DECLARE total INT DEFAULT 0;
    DECLARE avail INT DEFAULT 0;

    SELECT COUNT(*) INTO total FROM BookCopy WHERE bookID = NEW.bookID;
    SELECT COUNT(*) INTO avail FROM BookCopy WHERE bookID = NEW.bookID AND status = 'Available';

    UPDATE Book
    SET totalCopies = total,
        availableCopies = avail
    WHERE bookID = NEW.bookID;
END; //

DROP TRIGGER IF EXISTS after_update_borrowdetail_return_actions //
CREATE TRIGGER after_update_borrowdetail_return_actions
AFTER UPDATE ON BorrowDetail
FOR EACH ROW
BEGIN
    DECLARE fineExists INT;

    IF NEW.actualReturnDate IS NOT NULL AND OLD.actualReturnDate IS NULL THEN
        -- 1. Cập nhật trạng thái sách thành Available
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
