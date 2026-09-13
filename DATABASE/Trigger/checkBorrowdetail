DELIMITER //

CREATE TRIGGER before_update_borrowdetail_renew
BEFORE UPDATE ON BorrowDetail
FOR EACH ROW
BEGIN
    -- Nếu dueDate thay đổi => đang thực hiện gia hạn
    IF NEW.dueDate != OLD.dueDate THEN
        -- Kiểm tra số lần gia hạn (tối đa 4 lần – FR3.3)
        SET NEW.renewalCount = OLD.renewalCount + 1;
        IF NEW.renewalCount > 4 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Số lần gia hạn vượt quá giới hạn (tối đa 4 lần)';
        END IF;

        -- Kiểm tra sách có đang bị đặt trước không (dựa vào status của BookCopy)
        IF EXISTS (
            SELECT 1 FROM BookCopy
            WHERE copyID = NEW.copyID AND status = 'Reserved'
        ) THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Không thể gia hạn vì sách đang bị đặt trước bởi bạn đọc khác';
        END IF;

        -- Kiểm tra tài khoản bạn đọc có bị khóa hoặc có phạt chưa trả không
        -- (có thể kiểm tra ở đây hoặc ở tầng ứng dụng)
        -- Tôi giả định đã kiểm tra ở tầng ứng dụng, nhưng có thể thêm:
        -- IF (SELECT cardStatus FROM Reader WHERE readerID = ... ) != 'Active' ...
        -- Tuy nhiên, để đơn giản, tôi để trigger này chỉ kiểm tra về sách và số lần gia hạn.
    END IF;
END; //

DELIMITER ;
