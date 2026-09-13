SELECT 
    fr.fineID,
    b.title,
    bc.barcode,
    fr.reason,
    fr.amount,
    fr.issuedDate
FROM FineReceipt fr
JOIN BorrowDetail bd ON fr.borrowDetailID = bd.borrowDetailID
JOIN BorrowRecord br ON bd.borrowID = br.borrowID
JOIN BookCopy bc ON bd.copyID = bc.copyID
JOIN Book b ON bc.bookID = b.bookID
WHERE br.readerID = ? AND fr.status = 'Pending';

UPDATE FineReceipt 
SET status = 'Paid',
    paidDate = NOW(),
    staffID = ?
WHERE fineID = ?;
