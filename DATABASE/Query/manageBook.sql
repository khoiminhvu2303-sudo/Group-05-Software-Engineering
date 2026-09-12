USE LIBRARY_MANAGEMENT_SYSTEM;

INSERT INTO Book (BookID, Title, `Describe`, Publication, Stockquantity, Status, AuthorID, PublisherID, CategoryID)
VALUES (?, ?, ?, ?, ?, 'Available', ?, ?, ?);

INSERT INTO BookCopy (CopyID, BookID, Barcode, Status, `Condition`, Price)
VALUES (?, ?, ?, 'Available', ?, ?);

UPDATE Book 
SET Title = ?,
    `Describe` = ?,
    Publication = ?,
    Stockquantity = ?,
    AuthorID = ?,
    PublisherID = ?,
    CategoryID = ?
WHERE BookID = ?;

UPDATE BookCopy 
SET Status = 'Lost' 
WHERE CopyID = ?;
