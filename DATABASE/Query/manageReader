SELECT * 
FROM Reader 
WHERE cardStatus = 'Pending' 
ORDER BY createdDate ASC;

UPDATE Reader 
SET cardStatus = 'Active',
    cardExpiryDate = DATE_ADD(CURDATE(), INTERVAL 1 YEAR)
WHERE readerID = ?;

-- Khoá
UPDATE Reader SET cardStatus = 'Suspended' WHERE readerID = ?;

-- Mở khoá
UPDATE Reader SET cardStatus = 'Active' WHERE readerID = ?;

SELECT * 
FROM Reader 
WHERE fullName LIKE CONCAT('%', ?, '%')
   OR email LIKE CONCAT('%', ?, '%')
   OR phone LIKE CONCAT('%', ?, '%');
