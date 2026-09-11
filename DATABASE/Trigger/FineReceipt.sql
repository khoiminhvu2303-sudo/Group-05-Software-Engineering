DELIMITER //

CREATE TRIGGER after_insert_finereceipt
AFTER INSERT ON FineReceipt
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
        FROM FineReceipt fr
        JOIN BorrowDetail bd ON fr.borrowDetailID = bd.borrowDetailID
        JOIN BorrowRecord br ON bd.borrowID = br.borrowID
        WHERE br.readerID = reader_id
          AND fr.status = 'Pending'
    ) THEN
        UPDATE Reader
        SET cardStatus = 'Suspended'
        WHERE readerID = reader_id;
    END IF;
END; //

DELIMITER ;
