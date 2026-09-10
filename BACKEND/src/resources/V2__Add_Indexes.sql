
USE LIBRARY_MANAGEMENT_SYSTEM3;

CREATE INDEX idx_reader_status ON Reader (Status);
CREATE INDEX idx_reader_expirydate ON Reader (ExpiryDate);
CREATE INDEX idx_reader_fullname ON Reader (FullName);
CREATE INDEX idx_reader_startdate ON Reader (StartDate);


CREATE INDEX idx_staff_status ON Staff (Status);

CREATE INDEX idx_book_title ON Book (Title);
CREATE INDEX idx_book_status ON Book (Status);
CREATE INDEX idx_book_publication ON Book (Publication);
CREATE INDEX idx_book_category_status ON Book (CategoryID, Status);



CREATE INDEX idx_bookcopy_status ON BookCopy (Status);
CREATE INDEX idx_bookcopy_book_status ON BookCopy (BookID, Status);


CREATE INDEX idx_reservation_status ON Reservation (Status);
CREATE INDEX idx_reservation_expirydate ON Reservation (ExpiryDate);
CREATE INDEX idx_reservation_reader_status ON Reservation (ReaderID, Status);
CREATE INDEX idx_reservation_copy_status ON Reservation (CopyID, Status);


CREATE INDEX idx_borrowrecord_borrowdate ON BorrowRecord (BorrowDate);
CREATE INDEX idx_borrowrecord_status ON BorrowRecord (Status);
CREATE INDEX idx_borrowrecord_reader_status ON BorrowRecord (ReaderID, Status);
CREATE INDEX idx_borrowrecord_staff_status ON BorrowRecord (StaffID, Status);


CREATE INDEX idx_borrowdetail_duedate ON BorrowDetail (DueDate);
CREATE INDEX idx_borrowdetail_actualreturndate ON BorrowDetail (ActualReturnDate);
CREATE INDEX idx_borrowdetail_status ON BorrowDetail (Status);
CREATE INDEX idx_borrowdetail_borrow_status ON BorrowDetail (BorrowID, Status);
CREATE INDEX idx_borrowdetail_copy_status ON BorrowDetail (CopyID, Status);


CREATE INDEX idx_finereceipt_paymentstatus ON FineReceipt (PaymentStatus);



CREATE INDEX idx_detailfinereceipt_status ON DetailFineReceipt (Status);
CREATE INDEX idx_detailfinereceipt_paiddate ON DetailFineReceipt (PaidDate);



CREATE INDEX idx_wishlist_addeddate ON WishList (AddedData);


CREATE INDEX idx_auditlog_userid ON Auditlog (UserID);
CREATE INDEX idx_auditlog_action ON Auditlog (Action);
CREATE INDEX idx_auditlog_createdat ON Auditlog (CreatedAt);
CREATE INDEX idx_auditlog_tablename ON Auditlog (TableName);
CREATE INDEX idx_auditlog_user_action ON Auditlog (UserID, Action);


CREATE INDEX idx_author_authorname ON Author (AuthorName);


CREATE INDEX idx_category_categoryname ON Category (CategoryName);
