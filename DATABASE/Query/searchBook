SELECT 
    b.bookID,
    b.title,
    b.author,
    b.genre,
    b.publicationYear,
    b.publisher,
    b.isbn,
    (SELECT COUNT(*) FROM BookCopy bc 
     WHERE bc.bookID = b.bookID AND bc.status = 'Available') AS availableCopies
FROM Book b
WHERE b.title LIKE CONCAT('%', ?, '%')
   OR b.author LIKE CONCAT('%', ?, '%')
   OR b.genre LIKE CONCAT('%', ?, '%')
   OR b.isbn = ?
ORDER BY b.title;

SELECT 
    b.*,
    bc.copyID,
    bc.barcode,
    bc.shelfLocation,
    bc.status AS copyStatus
FROM Book b
LEFT JOIN BookCopy bc ON b.bookID = bc.bookID
WHERE b.bookID = ?;
