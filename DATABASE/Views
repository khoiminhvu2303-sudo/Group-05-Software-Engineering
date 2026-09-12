USE LIBRARY_MANAGEMENT_SYSTEM;

DROP VIEW IF EXISTS v_BorrowDetails;
CREATE VIEW v_BorrowDetails AS
SELECT 
    br.BorrowID,
    r.FullName AS readerName,
    r.Email AS readerEmail,
    s.StaffName AS staffName,               
    br.BorrowDate,
    bd.BorrowDetailID,
    bk.Title,
    bc.Barcode,
    bd.DueDate,
    bd.ActualReturnDate,
    bd.Status AS loanStatus,
    bd.RenewalCount,
    bd.ReturnCondition,
    dfr.DetailFineID AS fineID,             
    dfr.Amount AS fineAmount,
    dfr.Status AS fineStatus
FROM BorrowRecord br
JOIN Reader r ON br.ReaderID = r.ReaderID
JOIN Staff s ON br.StaffID = s.StaffID
JOIN BorrowDetail bd ON br.BorrowID = bd.BorrowID
JOIN BookCopy bc ON bd.CopyID = bc.CopyID
JOIN Book bk ON bc.BookID = bk.BookID
LEFT JOIN DetailFineReceipt dfr ON bd.BorrowDetailID = dfr.BorrowDetailID;

DROP VIEW IF EXISTS v_UnpaidFines;
CREATE VIEW v_UnpaidFines AS
SELECT 
    dfr.DetailFineID AS fineID,
    r.FullName AS readerName,
    r.Email AS readerEmail,
    bk.Title,
    bc.Barcode,
    dfr.Reason,
    dfr.Amount,
    dfr.IssuedDate
FROM DetailFineReceipt dfr
JOIN BorrowDetail bd ON dfr.BorrowDetailID = bd.BorrowDetailID
JOIN BorrowRecord br ON bd.BorrowID = br.BorrowID
JOIN Reader r ON br.ReaderID = r.ReaderID
JOIN BookCopy bc ON bd.CopyID = bc.CopyID
JOIN Book bk ON bc.BookID = bk.BookID
WHERE dfr.Status = 'Pending';

DROP VIEW IF EXISTS v_OverdueLoans;
CREATE VIEW v_OverdueLoans AS
SELECT 
    bd.BorrowDetailID,
    r.FullName AS readerName,
    r.Email AS readerEmail,
    bk.Title,
    bc.Barcode,
    bd.DueDate,
    DATEDIFF(CURDATE(), bd.DueDate) AS overdueDays
FROM BorrowDetail bd
JOIN BorrowRecord br ON bd.BorrowID = br.BorrowID
JOIN Reader r ON br.ReaderID = r.ReaderID
JOIN BookCopy bc ON bd.CopyID = bc.CopyID
JOIN Book bk ON bc.BookID = bk.BookID
WHERE bd.ActualReturnDate IS NULL
  AND bd.DueDate < CURDATE();
