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
