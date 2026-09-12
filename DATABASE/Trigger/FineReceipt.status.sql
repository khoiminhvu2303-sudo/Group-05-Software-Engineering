DELIMITER //

CREATE TRIGGER after_update_finereceipt_paid
AFTER UPDATE ON DetailFineReceipt
FOR EACH ROW
BEGIN
    DECLARE reader_id INT;
    -- Chỉ xử lý khi status vừa chuyển từ Pending sang Paid
    IF OLD.Status = 'Pending' AND NEW.Status = 'Paid' THEN
        -- Lấy readerID
        SELECT br.readerID INTO reader_id
        FROM BorrowDetail bd
        JOIN BorrowRecord br ON bd.borrowID = br.borrowID
        WHERE bd.borrowDetailID = NEW.borrowDetailID;

        -- Kiểm tra xem reader còn fine pending nào khác không
        IF NOT EXISTS (
            SELECT 1
            FROM FineReceipt fr
            JOIN BorrowDetail bd ON fr.borrowDetailID = bd.borrowDetailID
            JOIN BorrowRecord br ON bd.borrowID = br.borrowID
            WHERE br.readerID = reader_id
              AND fr.Status = 'Pending'
        ) THEN
            -- Nếu không còn fine nào, mở khoá tài khoản
            UPDATE Reader
            SET cardStatus = 'Active'
            WHERE readerID = reader_id;
        END IF;
    END IF;
END; //

DELIMITER ;
