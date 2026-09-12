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

    -- Nếu có bất kỳ fine nào chưa trả (Status = Pending) của reader này, khóa tài khoản
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

DELIMITER ;
