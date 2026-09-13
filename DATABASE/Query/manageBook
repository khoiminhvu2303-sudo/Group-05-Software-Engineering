INSERT INTO Book (title, author, publisher, publicationYear, genre, isbn, description)
VALUES (?, ?, ?, ?, ?, ?, ?);
INSERT INTO BookCopy (bookID, barcode, shelfLocation, status)
VALUES (?, ?, ?, 'Available');
UPDATE Book 
SET title = ?,
    author = ?,
    publisher = ?,
    publicationYear = ?,
    genre = ?,
    isbn = ?,
    description = ?
WHERE bookID = ?;
UPDATE BookCopy SET status = 'Lost' WHERE copyID = ?;
