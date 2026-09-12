USE LIBRARY_MANAGEMENT_SYSTEM;

SELECT 
    b.BookID,
    b.Title,
    COUNT(*) AS BorrowCount
FROM BorrowDetail bd
JOIN BookCopy bc ON bd.CopyID = bc.CopyID
JOIN Book b ON bc.BookID = b.BookID
GROUP BY b.BookID, b.Title
ORDER BY BorrowCount DESC
LIMIT 10;

SELECT 
    DATE_FORMAT(br.BorrowDate, '%Y-%m') AS Month,
    COUNT(*) AS TotalBorrows
FROM BorrowRecord br
GROUP BY Month
ORDER BY Month DESC;

SELECT * FROM v_OverdueLoans;

SELECT 
    DATE_FORMAT(PaidDate, '%Y-%m') AS Month,
    SUM(Amount) AS TotalFine
FROM DetailFineReceipt
WHERE Status = 'Paid'
GROUP BY Month
ORDER BY Month DESC;

SELECT 
    DATE_FORMAT(StartDate, '%Y-%m') AS Month,
    COUNT(*) AS NewReaders
FROM Reader
GROUP BY Month
ORDER BY Month DESC;
