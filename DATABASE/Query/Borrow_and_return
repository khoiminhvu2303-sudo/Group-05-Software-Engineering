SELECT 
    r.readerID,
    r.fullName,
    r.cardStatus,
    r.cardExpiryDate,
    (SELECT COUNT(*) 
     FROM BorrowDetail bd 
     JOIN BorrowRecord br ON bd.borrowID = br.borrowID 
     WHERE br.readerID = r.readerID AND bd.actualReturnDate IS NULL) AS currentBorrowed,
    (SELECT COUNT(*) 
     FROM FineReceipt fr 
     JOIN BorrowDetail bd ON fr.borrowDetailID = bd.borrowDetailID 
     JOIN BorrowRecord br ON bd.borrowID = br.borrowID 
     WHERE br.readerID = r.readerID AND fr.status = 'Pending') AS unpaidFines,
    CASE 
        WHEN r.cardStatus != 'Active' THEN 'Thẻ không hoạt động'
        WHEN r.cardExpiryDate < CURDATE() THEN 'Thẻ hết hạn'
        WHEN (SELECT COUNT(*) FROM BorrowDetail bd JOIN BorrowRecord br ON bd.borrowID = br.borrowID WHERE br.readerID = r.readerID AND bd.actualReturnDate IS NULL) >= 5 THEN 'Vượt quá số sách được mượn'
        WHEN EXISTS (SELECT 1 FROM FineReceipt fr JOIN BorrowDetail bd ON fr.borrowDetailID = bd.borrowDetailID JOIN BorrowRecord br ON bd.borrowID = br.borrowID WHERE br.readerID = r.readerID AND fr.status = 'Pending') THEN 'Có phạt chưa thanh toán'
        ELSE 'Đủ điều kiện'
    END AS eligibility
FROM Reader r
WHERE r.readerID = ?;

START TRANSACTION;

INSERT INTO BorrowRecord (readerID, staffID) 
VALUES (?, ?);

SET @borrowID = LAST_INSERT_ID();

-- Thêm từng cuốn sách vào chi tiết mượn (trigger sẽ tự tính dueDate và cập nhật BookCopy)
INSERT INTO BorrowDetail (borrowID, copyID) 
VALUES (@borrowID, ?);

COMMIT;

UPDATE BorrowDetail 
SET actualReturnDate = CURDATE(),
    returnCondition = ?   -- 'Good', 'Damaged', 'Lost'
WHERE borrowDetailID = ?;

UPDATE BorrowDetail 
SET dueDate = DATE_ADD(dueDate, INTERVAL 14 DAY)
WHERE borrowDetailID = ?;

SELECT 
    br.borrowID,
    br.borrowDate,
    b.title,
    bc.barcode,
    bd.dueDate,
    bd.actualReturnDate,
    bd.status AS loanStatus,
    bd.renewalCount,
    fr.amount AS fineAmount,
    fr.status AS fineStatus
FROM BorrowRecord br
JOIN BorrowDetail bd ON br.borrowID = bd.borrowID
JOIN BookCopy bc ON bd.copyID = bc.copyID
JOIN Book b ON bc.bookID = b.bookID
LEFT JOIN FineReceipt fr ON bd.borrowDetailID = fr.borrowDetailID
WHERE br.readerID = ?
ORDER BY br.borrowDate DESC;
