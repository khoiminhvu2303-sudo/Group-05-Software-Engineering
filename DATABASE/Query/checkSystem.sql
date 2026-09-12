SELECT 
    (SELECT COUNT(*) FROM Book) AS totalTitles,
    (SELECT COUNT(*) FROM BookCopy) AS totalCopies,
    (SELECT COUNT(*) FROM BookCopy WHERE Status = 'Borrowed') AS onLoan, 
    (SELECT COUNT(*) FROM BookCopy WHERE Status = 'Available') AS available;

SELECT 
    Status AS cardStatus, 
    COUNT(*) AS total
FROM Reader
GROUP BY Status;
