USE LIBRARY_MANAGEMENT_SYSTEM;

SELECT 
    r.ReaderID,
    r.FullName,
    r.Status AS CardStatus,
    r.ExpiryDate,
    (SELECT COUNT(*) 
     FROM BorrowDetail bd 
     JOIN BorrowRecord br ON bd.BorrowID = br.BorrowID 
     WHERE br.ReaderID = r.ReaderID AND bd.ActualReturnDate IS NULL) AS CurrentBorrowed,
    (SELECT COUNT(*) 
     FROM DetailFineReceipt dfr 
     JOIN BorrowDetail bd ON dfr.BorrowDetailID = bd.BorrowDetailID 
     JOIN BorrowRecord br ON bd.BorrowID = br.BorrowID 
     WHERE br.ReaderID = r.ReaderID AND dfr.Status = 'Pending') AS UnpaidFines,
    CASE 
        WHEN r.Status != 'Active' THEN N'Thẻ không hoạt động'
        WHEN r.ExpiryDate < CURDATE() THEN N'Thẻ hết hạn'
        WHEN (SELECT COUNT(*) FROM BorrowDetail bd JOIN BorrowRecord br ON bd.BorrowID = br.BorrowID WHERE br.ReaderID = r.ReaderID AND bd.ActualReturnDate IS NULL) >= 5 THEN N'Vượt quá số sách được mượn'
        WHEN EXISTS (SELECT 1 FROM DetailFineReceipt dfr JOIN BorrowDetail bd ON dfr.BorrowDetailID = bd.BorrowDetailID JOIN BorrowRecord br ON bd.BorrowID = br.BorrowID WHERE br.ReaderID = r.ReaderID AND dfr.Status = 'Pending') THEN N'Có phạt chưa thanh toán'
        ELSE N'Đủ điều kiện'
    END AS Eligibility
FROM Reader r
WHERE r.ReaderID = ?; -- Truyền ReaderID (vd: 'RD00000001')
