DELIMITER //

DROP TRIGGER IF EXISTS after_insert_finereceipt //
CREATE TRIGGER after_insert_finereceipt
AFTER INSERT ON DetailFineReceipt
FOR EACH ROW
BEGIN
    DECLARE reader_id INT;
    
    -- Lấy readerID từ BorrowDetail -> BorrowRecord
    SELECT br.readerID INTO reader_id
    FROM BorrowDetail bd
    JOIN BorrowRecord br ON bd.borrowID = br.borrowID
    WHERE bd.borrowDetailID = NEW.borrowDetailID;

    -- Nếu có bất kỳ fine nào chưa trả của reader này, khóa tài khoản
    IF EXISTS (
        SELECT 1
        FROM DetailFineReceipt fr
        JOIN BorrowDetail bd ON fr.borrowDetailID = bd.borrowDetailID
        JOIN BorrowRecord br ON bd.borrowID = br.borrowID
        WHERE br.readerID = reader_id
          AND fr.Status = 'Pending'
    ) THEN
        UPDATE Reader
        SET Status = 'Suspended'
        WHERE ReaderID = reader_id;
    END IF;
END; //

DROP TRIGGER IF EXISTS after_update_finereceipt_paid //
CREATE TRIGGER after_update_finereceipt_paid
AFTER UPDATE ON DetailFineReceipt
FOR EACH ROW
BEGIN
    DECLARE reader_id INT;
    
    -- Chỉ xử lý khi Status vừa chuyển từ Pending sang Paid
    IF OLD.Status = 'Pending' AND NEW.Status = 'Paid' THEN
        -- Lấy readerID
        SELECT br.readerID INTO reader_id
        FROM BorrowDetail bd
        JOIN BorrowRecord br ON bd.borrowID = br.borrowID
        WHERE bd.borrowDetailID = NEW.borrowDetailID;

        -- Kiểm tra xem reader còn fine pending nào khác không
        IF NOT EXISTS (
            SELECT 1
            FROM DetailFineReceipt fr
            JOIN BorrowDetail bd ON fr.borrowDetailID = bd.borrowDetailID
            JOIN BorrowRecord br ON bd.borrowID = br.borrowID
            WHERE br.readerID = reader_id
              AND fr.Status = 'Pending'
        ) THEN
            -- Nếu không còn fine nào, mở khoá tài khoản
            UPDATE Reader
            SET Status = 'Active'
            WHERE ReaderID = reader_id;
        END IF;
    END IF;
END; //

DELIMITER ;
