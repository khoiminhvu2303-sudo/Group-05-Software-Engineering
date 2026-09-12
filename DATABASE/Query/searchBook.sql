USE LIBRARY_MANAGEMENT_SYSTEM;

SELECT 
    b.BookID,
    b.Title,
    a.AuthorName,
    c.CategoryName,
    b.Publication,
    p.Name AS PublisherName,
    (SELECT COUNT(*) 
     FROM BookCopy bc 
     WHERE bc.BookID = b.BookID AND bc.Status = 'Available') AS AvailableCopies
FROM Book b
JOIN Author a ON b.AuthorID = a.AuthorID
JOIN Category c ON b.CategoryID = c.CategoryID
JOIN Publisher p ON b.PublisherID = p.PublisherID
WHERE b.Title LIKE CONCAT('%', ?, '%')
   OR a.AuthorName LIKE CONCAT('%', ?, '%')
   OR c.CategoryName LIKE CONCAT('%', ?, '%')
ORDER BY b.Title;

SELECT 
    b.BookID,
    b.Title,
    b.`Describe`,
    b.Publication,
    a.AuthorName,
    p.Name AS PublisherName,
    c.CategoryName,
    bc.CopyID,
    bc.Barcode,
    bc.`Condition`,
    bc.Price,
    bc.Status AS CopyStatus
FROM Book b
JOIN Author a ON b.AuthorID = a.AuthorID
JOIN Publisher p ON b.PublisherID = p.PublisherID
JOIN Category c ON b.CategoryID = c.CategoryID
LEFT JOIN BookCopy bc ON b.BookID = bc.BookID
WHERE b.BookID = ?;
