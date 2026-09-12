USE LIBRARY_MANAGEMENT_SYSTEM;

SELECT * 
FROM Reader 
WHERE Status = 'Suspended' 
ORDER BY StartDate ASC;

UPDATE Reader 
SET Status = 'Active',
    ExpiryDate = DATE_ADD(CURDATE(), INTERVAL 1 YEAR)
WHERE ReaderID = ?;

UPDATE Reader 
SET Status = 'Suspended' 
WHERE ReaderID = ?;

UPDATE Reader 
SET Status = 'Active' 
WHERE ReaderID = ?;

SELECT * 
FROM Reader 
WHERE FullName LIKE CONCAT('%', ?, '%')
   OR Email LIKE CONCAT('%', ?, '%')
   OR Phone LIKE CONCAT('%', ?, '%');
   
