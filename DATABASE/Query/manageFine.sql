USE LIBRARY_MANAGEMENT_SYSTEM;

SELECT 
    dfr.DetailFineID AS FineID,
    b.Title,
    bc.Barcode,
    dfr.Reason,
    dfr.Amount,
    dfr.IssuedDate
FROM DetailFineReceipt dfr
JOIN BorrowDetail bd ON dfr.BorrowDetailID = bd.BorrowDetailID
JOIN BorrowRecord br ON bd.BorrowID = br.BorrowID
JOIN BookCopy bc ON bd.CopyID = bc.CopyID
JOIN Book b ON bc.BookID = b.BookID
WHERE br.ReaderID = ? AND dfr.Status = 'Pending';

UPDATE DetailFineReceipt 
SET Status = 'Paid',
    PaidDate = NOW(),
    StaffID = ?
WHERE DetailFineID = ?;
