SELECT * FROM Staff WHERE isActive = 1;
INSERT INTO Staff (fullName, email, role, passwordHash)
VALUES (?, ?, ?, ?);
UPDATE Staff SET role = ? WHERE staffID = ?;
UPDATE Staff SET isActive = 0 WHERE staffID = ?;
