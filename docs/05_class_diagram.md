# 5. Class Diagram

## 5.1 Architecture Overview
The Class Diagram models the static structural view of the Library Management System. It illustrates the system's domain entities, their internal attributes, operational methods, and structural relationships. The domain model is categorized into three main functional groups: User Management (Reader, Staff, Admin), Material Management (Book, Author, Category, Publisher), and Circulation Management (BorrowRecord, BorrowDetail, FineReceipt, FineReceiptDetail).

## 5.2 Class Descriptions and Specifications

### 1. Reader
* **Description:** Represents registered library members eligible to search catalog items, reserve materials, and manage personal loans.
* **Attributes:** `ReaderID` (PK), `FullName`, `DOB`, `Phone`, `Email`, `Address`, `CCCD`, `StartDate`, `ExpiryDate`, `Username`, `Password`.
* **Methods:**
  * `login(user, pass): boolean` — Authenticates reader credentials against stored hashes.
  * `searchBook(keyword): List<Book>` — Queries the catalog database by title, author, or genre.
  * `reserveBook(BookID): boolean` — Holds an available physical book copy.
  * `renewBookOnline(BookID): boolean` — Extends the due date for active book loans.
  * `viewBorrowHistory(): List<BorrowRecord>` — Retrieves the reader's past and current borrowing records.

### 2. Staff
* **Description:** Represents library personnel operating counter operations, managing inventory, and handling circulation desk tasks.
* **Attributes:** `StaffID` (PK), `StaffName`, `Gender`, `Birthday`, `Phone`, `Email`, `Address`, `CCCD`, `Salary`, `NameLogin_Staff`, `Password_Staff`, `ManagedByAdminID` (FK).
* **Methods:**
  * `login(user, pass): boolean` — Authenticates librarian access to counter interfaces.
  * `manageBook(bookDetails): void` — Adds, updates, or flags catalog items.
  * `processBorrow(readerID, listBookID): BorrowRecord` — Generates checkout transactions at the circulation desk.
  * `processReturn(transactionID): void` — Receives returned items, checks physical condition, and closes open borrowing entries.
  * `createFineReceipt(transactionID, reason, amount): FineReceipt` — Issues fine tickets for late returns or damaged materials.

### 3. Admin
* **Description:** Holds system administrator credentials, managing user roles, configuring system policies, and generating management reports.
* **Attributes:** `AdminID` (PK), `AdminName`, `Email`, `Phone`, `CCCD`, `Salary`, `NameLogin_Admin`, `Password_Admin`.
* **Methods:**
  * `manageStaffAccount(staffID, action): void` — Creates, updates, or revokes staff system privileges.
  * `approveReaderCard(readerID): void` — Reviews and approves pending online reader registration applications.
  * `generateSystemReport(type): Report` — Aggregates system metrics and outputs statistical analysis reports.

### 4. Book
* **Description:** Stores core metadata for library collection items and tracks physical stock levels.
* **Attributes:** `BookID` (PK), `Title`, `Describe`, `PublicationYear`, `StockQuantity`, `Status`, `AuthorID` (FK), `PublisherID` (FK), `CategoryID` (FK).
* **Methods:**
  * `updateStock(quantity): void` — Adjusts available inventory counts based on borrowings or additions.
  * `updateStatus(newStatus): void` — Updates item availability status (e.g., Available, On borrow, Damaged).
  * `getBookDetails(): string` — Retrieves bibliographic details for UI views.

### 5. BorrowRecord & BorrowDetail
* **Description:** Encapsulates borrowing transactions. `BorrowRecord` stores header-level information (who, when, processed by), while `BorrowDetail` handles line-item details for individual physical books.
* **BorrowRecord Attributes:** `transactionID` (PK), `readerID` (FK), `staffID` (FK), `DateBorrow`, `DueDate`.
* **BorrowDetail Attributes:** `BorrowDetail_ID` (PK), `transactionID` (FK), `BookID` (FK), `BookStatus`, `Describe`, `ActualReturnDate`, `DateIssued`.
* **Methods:**
  * `calculateOverdueDays(): int` — Calculates the difference between the actual return date and the due date to evaluate potential fine amounts.

### 6. FineReceipt & FineReceiptDetail
* **Description:** Records violation transactions, fine amounts, and payment updates arising from overdue returns or material damage.
* **FineReceipt Attributes:** `FineID` (PK), `TransactionID` (FK), `Describe`, `Amount`, `PaymentStatus`.
* **FineReceiptDetail Attributes:** `FineReceiptDetail_ID` (PK), `FineID` (FK), `ReaderID` (FK), `FineReceiptStatus`, `DateBorrow`, `DueDate`, `Describe`, `DateIssued`, `Amount`.
* **Methods:**
  * `updatePaymentStatus(status): void` — Updates fine ticket status (e.g., from "Pending Payment" to "Paid").

### 7. Auxiliary Lookup Classes (Author, Category, Publisher)
* **Description:** Reference classes normalized to hold master metadata linked to book records.
* **Attributes:** Unique identifiers (`AuthorID`, `CategoryID`, `PublisherID`), descriptive names, contact details, and location details.
* **Methods:** Methods include profile updates (`updatePhone()`, `updateCategoryName()`) and lookup actions (`getBooksWritten()`, `getBooksInCategory()`).

<img width="940" height="966" alt="image" src="https://github.com/user-attachments/assets/d79d5c50-f06d-4f88-ad2b-aff4df5f9158" />

---

## 5.3 Entity Relationship & Multiplicity Analysis

* **Reader to BorrowRecord (1 : 0..*):** One reader can initiate zero or many borrowing transactions over time, but each loan record belongs to exactly one reader.
* **Staff to BorrowRecord (1 : 0..*):** A librarian processes multiple borrowing records, whereas a single transaction is handled by one staff member.
* **BorrowRecord to BorrowDetail (1 : 1..*):** A borrowing header record contains one or more detailed item entries representing individual books.
* **Book to BorrowDetail (1 : 1..*):** A single book title can appear across multiple transaction details over its lifecycle.
* **BorrowRecord to FineReceipt (1 : 0..1):** A borrowing transaction generates at most one fine receipt if policy violations occur.
* **FineReceipt to FineReceiptDetail (1 : 1..*):** A fine receipt includes one or more line-item violation records.
* **Book to Auxiliary Reference Classes (0..* : 1):** Multiple books can be linked to one author, one publisher, or one category.
* **Admin to Staff (1 : 1..*):** An administrator manages multiple staff member profiles.

<img width="940" height="651" alt="image" src="https://github.com/user-attachments/assets/e679d743-a2e2-49b6-b2c8-7724231efc70" />
