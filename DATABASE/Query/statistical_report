SELECT 
    b.bookID,
    b.title,
    COUNT(*) AS borrowCount
FROM BorrowDetail bd
JOIN BookCopy bc ON bd.copyID = bc.copyID
JOIN Book b ON bc.bookID = b.bookID
GROUP BY b.bookID, b.title
ORDER BY borrowCount DESC
LIMIT 10;

SELECT 
    DATE_FORMAT(br.borrowDate, '%Y-%m') AS month,
    COUNT(*) AS totalBorrows
FROM BorrowRecord br
GROUP BY month
ORDER BY month DESC;

SELECT * FROM v_OverdueLoans;
SELECT 
    DATE_FORMAT(paidDate, '%Y-%m') AS month,
    SUM(amount) AS totalFine
FROM FineReceipt
WHERE status = 'Paid'
GROUP BY month
ORDER BY month DESC;

SELECT 
    DATE_FORMAT(createdDate, '%Y-%m') AS month,
    COUNT(*) AS newReaders
FROM Reader
GROUP BY month
ORDER BY month DESC;
