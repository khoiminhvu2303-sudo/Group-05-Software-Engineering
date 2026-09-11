SELECT 
    (SELECT COUNT(*) FROM Book) AS totalTitles,
    (SELECT COUNT(*) FROM BookCopy) AS totalCopies,
    (SELECT COUNT(*) FROM BookCopy WHERE status = 'On loan') AS onLoan,
    (SELECT COUNT(*) FROM BookCopy WHERE status = 'Available') AS available;
SELECT 
    cardStatus,
    COUNT(*) AS total
FROM Reader
GROUP BY cardStatus;
