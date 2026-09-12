USE LIBRARY_MANAGEMENT_SYSTEM;

SELECT * 
FROM Staff 
WHERE Status = 'Active';

INSERT INTO Staff (StaffID, StaffName, Email, NameLogin_Staff, Password_Staff, Status, ManagedByAdminID)
VALUES (?, ?, ?, ?, ?, 'Active', ?);

UPDATE Staff 
SET ManagedByAdminID = ?,
    Salary = ?
WHERE StaffID = ?;

UPDATE Staff 
SET Status = 'Inactive' 
WHERE StaffID = ?;
