CREATE DATABASE IF NOT EXISTS LIBRARY_MANAGEMENT_SYSTEM;
USE LIBRARY_MANAGEMENT_SYSTEM;

DROP TABLE IF EXISTS Auditlog;
DROP TABLE IF EXISTS DetailFineReceipt;
DROP TABLE IF EXISTS FineReceipt;
DROP TABLE IF EXISTS BorrowDetail;
DROP TABLE IF EXISTS BorrowRecord;
DROP TABLE IF EXISTS Reservation;
DROP TABLE IF EXISTS WishList;
DROP TABLE IF EXISTS BookCopy;
DROP TABLE IF EXISTS Book;
DROP TABLE IF EXISTS Category;
DROP TABLE IF EXISTS Publisher;
DROP TABLE IF EXISTS Author;
DROP TABLE IF EXISTS Reader;
DROP TABLE IF EXISTS Staff;
DROP TABLE IF EXISTS Administrator;

CREATE TABLE Administrator (
    AdminID CHAR(10) PRIMARY KEY,
    AdminName VARCHAR(50) NOT NULL,
    Gender VARCHAR(10),
    Email VARCHAR(50) UNIQUE,
    Phone CHAR(10),
    CCCD CHAR(12) UNIQUE,
    Salary DECIMAL(12,2),
    NameLogin_Admin VARCHAR(50) NOT NULL UNIQUE,
    Password_Admin VARCHAR(255) NOT NULL
);

CREATE TABLE Staff (
    StaffID CHAR(10) PRIMARY KEY,
    StaffName VARCHAR(50) NOT NULL,
    Gender VARCHAR(10),
    Birthday_Staff DATE,
    Numberphone CHAR(10),
    Email VARCHAR(50) UNIQUE,
    Address VARCHAR(50),
    CCCD CHAR(12) UNIQUE,
    Salary DECIMAL(12,2),
    NameLogin_Staff VARCHAR(50) NOT NULL UNIQUE,
    Password_Staff VARCHAR(255) NOT NULL,
    Status VARCHAR(50) DEFAULT 'Active',
    ManagedByAdminID CHAR(10),
    
    CONSTRAINT FK_Staff_Administrator FOREIGN KEY (ManagedByAdminID) REFERENCES Administrator(AdminID)
        ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE Reader ( 
    ReaderID CHAR(10) PRIMARY KEY,
    FullName VARCHAR(50) NOT NULL,
    DOB DATE NULL,
    Phone CHAR(10) NULL UNIQUE,
    Gender VARCHAR(10) NOT NULL,
    Email VARCHAR(50) NULL UNIQUE,
    Address VARCHAR(100) NULL,
    CCCD CHAR(12) NULL UNIQUE,
    StartDate DATE NOT NULL,
    ExpiryDate DATE NOT NULL,
    Username VARCHAR(50) NOT NULL UNIQUE,
    Password VARCHAR(255) NOT NULL,
    Status VARCHAR(50) NOT NULL DEFAULT 'Active',

    CONSTRAINT CHK_Reader_Status CHECK (Status IN ('Active', 'Locked', 'Suspended')),
    CONSTRAINT CHK_Reader_Dates CHECK (ExpiryDate > StartDate)
);

CREATE TABLE Author (
    AuthorID CHAR(10) PRIMARY KEY,
    AuthorName VARCHAR(50) NOT NULL,
    Note TEXT,
    Birthday DATE,
    Deathday DATE
);

CREATE TABLE Publisher ( 
    PublisherID CHAR(10) PRIMARY KEY,
    Name VARCHAR(100) NOT NULL UNIQUE,
    Address VARCHAR(100) NULL,
    Phone CHAR(10) NULL,
    Email VARCHAR(50) NULL,
    Website VARCHAR(100) NULL
);

CREATE TABLE Category (
    CategoryID CHAR(10) PRIMARY KEY,
    CategoryName VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Book (
    BookID CHAR(10) PRIMARY KEY,
    Title VARCHAR(100) NOT NULL,
    `Describe` TEXT,
    Publication DATE,
    Stockquantity INT DEFAULT 0,
    Status VARCHAR(50) DEFAULT 'Available',
    AuthorID CHAR(10) NOT NULL,
    PublisherID CHAR(10) NOT NULL,
    CategoryID CHAR(10) NOT NULL,
    
    CONSTRAINT FK_Book_Author FOREIGN KEY (AuthorID) REFERENCES Author(AuthorID),
    CONSTRAINT FK_Book_Publisher FOREIGN KEY (PublisherID) REFERENCES Publisher(PublisherID),
    CONSTRAINT FK_Book_Category FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
);

CREATE TABLE BookCopy (
    CopyID CHAR(10) PRIMARY KEY,
    BookID CHAR(10) NOT NULL,
    Barcode VARCHAR(50) NOT NULL UNIQUE,
    Status VARCHAR(50) DEFAULT 'Available' 
        CHECK (Status IN ('Available', 'Borrowed', 'Reserved', 'Lost', 'Damaged')),
    `Condition` VARCHAR(50),
    Price DECIMAL(12,2),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT FK_BookCopy_Book FOREIGN KEY (BookID) REFERENCES Book(BookID) ON DELETE CASCADE
);

CREATE TABLE WishList (
    WishListID CHAR(10) PRIMARY KEY,
    ReaderID CHAR(10) NOT NULL,
    BookID CHAR(10) NOT NULL,
    AddedData DATETIME DEFAULT CURRENT_TIMESTAMP,
    Note TEXT,
    
    CONSTRAINT FK_WishList_Reader FOREIGN KEY (ReaderID) REFERENCES Reader(ReaderID) ON DELETE CASCADE,
    CONSTRAINT FK_WishList_Book FOREIGN KEY (BookID) REFERENCES Book(BookID) ON DELETE CASCADE
);

CREATE TABLE Reservation (
    ReservationID CHAR(10) PRIMARY KEY,
    ReaderID CHAR(10) NOT NULL,
    CopyID CHAR(10) NOT NULL,
    ReservationDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    ExpiryDate DATETIME NOT NULL,
    Status VARCHAR(50) DEFAULT 'Pending',
    QRCode VARCHAR(255),
    Note TEXT,
    
    CONSTRAINT FK_Reservation_Reader FOREIGN KEY (ReaderID) REFERENCES Reader(ReaderID),
    CONSTRAINT FK_Reservation_Copy FOREIGN KEY (CopyID) REFERENCES BookCopy(CopyID)
);

CREATE TABLE BorrowRecord (
    BorrowID INT AUTO_INCREMENT PRIMARY KEY,
    ReaderID CHAR(10) NOT NULL,
    StaffID CHAR(10) NOT NULL,
    BorrowDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    Status VARCHAR(50) DEFAULT 'Active' CHECK (Status IN ('Active', 'Completed')),
    
    CONSTRAINT FK_BorrowRecord_Reader FOREIGN KEY (ReaderID) REFERENCES Reader(ReaderID),
    CONSTRAINT FK_BorrowRecord_Staff FOREIGN KEY (StaffID) REFERENCES Staff(StaffID)
);

CREATE TABLE BorrowDetail (
    BorrowDetailID INT AUTO_INCREMENT PRIMARY KEY,
    BorrowID INT NOT NULL,
    CopyID CHAR(10) NOT NULL,
    DueDate DATE NOT NULL,
    ActualReturnDate DATE NULL,
    RenewalCount INT DEFAULT 0,
    ReturnCondition VARCHAR(20) NULL CHECK (ReturnCondition IN ('Good', 'Damaged', 'Lost')),
    Status VARCHAR(50) DEFAULT 'On loan' CHECK (Status IN ('On loan', 'Returned', 'Overdue')),
    
    CONSTRAINT FK_BorrowDetail_BorrowRecord FOREIGN KEY (BorrowID) REFERENCES BorrowRecord(BorrowID) ON DELETE CASCADE,
    CONSTRAINT FK_BorrowDetail_BookCopy FOREIGN KEY (CopyID) REFERENCES BookCopy(CopyID)
);

CREATE TABLE FineReceipt (
    FineID CHAR(10) PRIMARY KEY,
    BorrowID INT NOT NULL,
    Note VARCHAR(255),
    Amount DECIMAL(12,2) NOT NULL DEFAULT 0.00,
    PaymentStatus VARCHAR(50) DEFAULT 'Unpaid' CHECK (PaymentStatus IN ('Unpaid', 'Paid')),

    CONSTRAINT FK_FineReceipt_BorrowRecord FOREIGN KEY (BorrowID) REFERENCES BorrowRecord(BorrowID)
);

CREATE TABLE DetailFineReceipt (
    DetailFineID INT AUTO_INCREMENT PRIMARY KEY,
    BorrowDetailID INT NOT NULL UNIQUE,
    StaffID CHAR(10) NULL,
    Reason VARCHAR(255) NOT NULL,
    Amount DECIMAL(10,2) NOT NULL,
    IssuedDate DATETIME DEFAULT CURRENT_TIMESTAMP,
    PaidDate DATETIME NULL,
    Status VARCHAR(50) DEFAULT 'Pending' CHECK (Status IN ('Pending', 'Paid', 'Void')),
    
    CONSTRAINT FK_DetailFine_BorrowDetail FOREIGN KEY (BorrowDetailID) REFERENCES BorrowDetail(BorrowDetailID),
    CONSTRAINT FK_DetailFine_Staff FOREIGN KEY (StaffID) REFERENCES Staff(StaffID)
);

CREATE TABLE Auditlog (
    LogID INT AUTO_INCREMENT PRIMARY KEY,
    UserID CHAR(10) NOT NULL,
    UserRole VARCHAR(20) NOT NULL,
    Action VARCHAR(50) NOT NULL,
    TableName VARCHAR(50),
    Description TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
