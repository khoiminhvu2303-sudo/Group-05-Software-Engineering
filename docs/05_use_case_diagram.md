# 4. Use case Diagram:

**1.	Overview of Use-Case Diagrams**

<img width="609" height="969" alt="image" src="https://github.com/user-attachments/assets/f3010d92-cf1e-4018-9587-90105db308a8" />


   **1.1	List of Actor**
   
  	1.1.1. Guest: Guests or users who have not logged into the system.
   
  	1.1.2. Reader: Registered readers who have been issued a library card have an account to access online functions (OPAC, renewals, and holds).
   
  	1.1.3  Staff: The librarian on duty at the circulation desk is authorized to handle circulation transactions (lending and returns) and manage the   collection.
   
  	1.1.4  Admin: Senior system administrator responsible for managing library staff, configuring library policies, and approving reports
   **1.2	List of Use-case**
   
  	1.2.1 Register Account: Sign up for a new reader account.
    
  	1.2.2 Log in: Log in to the system
    
  	1.2.3 Recover Password: Reset forgotten password.
    
  	1.2.4 View Personal Information: View personal profile details.
    
  	1.2.5 Search Books: Search for library books.
    
  	1.2.6 Reserve Book: Hold a book on the shelf.
    
  	1.2.7 View Borrowing History: View past and current book borrows.
    
  	1.2.8 Add to Online Wishlist: Save favorite books to list.
    
  	1.2.9 Remove from Online Wishlist: Delete books from wishlist
    
  	1.2.10 Renew Books Online: Extend book borrow via web/app.
    
  	1.2.11 Manage Book Catalog: Add, edit, or delete books.
    
  	1.2.12 Process Borrowing: Issue physical books to readers. 
    
  	1.2.13 Over-the-Counter Renewal: Extend book borrow at the counter.
    
  	1.2.14 Verify Reader Card: Validate reader card status.
    
  	1.2.15 Process Return: Receive returned books
    
  	1.2.16 Issue Fine Ticket: Create overdue or damage fine.
    
  	1.2.17 Print Receipt: Print transaction receipts.
    
  	1.2.18 Collect Fine Payment: Receive fine payment from reader
    
  	1.2.19 Manage Staff Accounts: Add, edit, or delete staff profiles
    
  	1.2.20 Manage Reader Accounts: Edit and activate reader accounts.
    
  	1.2.21 Statistics & Reports: View and export library reports
    
  	1.2.22 View Registration Requests: View pending sign-up requests
    
  	1.2.23 Approve Reader Card Issue: Activate card and issue QR code.
  	
  **2. Use-case Register Account**
  
2.1. Summary: Allows visitors to register for online reader accounts to send requests for new membership cards to the system.

2.2. Event stream:

2.2.1. Main line of events:

1. User selects "Register account" function on OPAC interface.
2. The system requires users to provide personal information: Full name, date of birth, gender, phone number, email address, CCCD number, permanent address and initialization password.
3. User enters information and confirms sending request.
4. The system checks the validity and compares duplicate data (avoid duplicate Emails, Phone Numbers or CCCDs in the D1: Readers database).
5. The system saves the reader profile in a pending approval state ("Pending Approval") and sends a notification of successful registration to the user.

2.2.2. Other event streams:

o In case the login name (email) already exists: The system displays the error message "This email is already in use". Users can choose to re-enter another email or cancel registration.

o In case of missing required information: If the user is missing Full Name, Email, Phone Number, CCCD or password of less than 6 characters, the system will report a specific error in each data field for the user to modify.

2.3. Special requirements:

o Passwords when stored in the database must be one-way encrypted using a secure hash function (Hash Function SHA-256 or higher, minimum 160 bits).

o The online registration function must integrate Captcha code to prevent data flooding by automated programs.

2.4. System status after performing Use-case: The registration request is successfully recorded in the Reader table in the "Pending Approval" state. System data status is updated securely.
**3. Use-case Log In**

3.1. Summary: Authenticate user credentials (Reader, Librarian, Administrator) to grant access to corresponding system functions.

3.2. Flow of events:

3.2.1. Main flow:

1.	The user accesses the login page and provides their username (Email) and password.
2.	The user clicks the "Log In" button.
3.	The system encrypts the entered password and compares it with the encrypted data stored in the database (D1: Readers, D5: Staff, or Admin).
4.	If the information matches, the system grants access and redirects the user to the interface corresponding to their assigned role.

3.2.2. Alternative flows:

o	Incorrect username or password: The system displays an error message stating "Incorrect username or password" (without specifying which field is incorrect to enhance security). The user may re-enter the credentials or cancel the operation.

3.3. System state prior to Use-case execution: The user is not logged into the system.

3.4. System state after Use-case execution: The user has successfully logged in and been issued an authentication token for the current session.

3.5. Extension points:

o	Recover Password Use-case: The user can choose to switch to the "Forgot Password" function if they do not remember their login password.

**4. Use-case Recover Password**

4.1. Summary: Allows users to regain account access after forgetting their password by using their registered personal email address.

4.2. Flow of events:

4.2.1. Main flow:

1.	The user selects the "Forgot Password" function from the login screen.
2.	The system prompts the user to provide the email address associated with their registered account.
3.	The system checks the database for the existence of the email.
4.	If the email exists, the system automatically generates a new random password, updates the user's record in the database, and simultaneously sends an email containing the new password to the user's inbox.
5.	The system displays a notification asking the user to check their personal email for the new password.

4.2.2. Alternative flows:

o	If the email does not exist in the system: The system displays an error message: "Email address does not exist in the system." The user may re-enter the email or exit the function.

4.3. Special requirements: The new password must be generated completely at random using the system's secure encryption algorithm and immediately hashed before being stored in the database.

4.4. System state after Use-case execution: The account's old password is invalidated, and the new random password is updated in the database.

**5. Use-case View Personal Information**

5.1. Summary: Users (Readers, Librarians, Administrators) access the system to view their personal details and activity history.

5.2. Flow of Events:

5.2.1. Main Flow:

1.	The user selects the "Profile" or "View Account Information" function.
2.	The system checks the current user's role and queries profile details from the corresponding table (Reader, Staff, or Admin).
3.	The system displays detailed information: full name, date of birth, phone number, email, address, account creation date, and borrowing/returning history (for readers) or shift activity history (for librarians).

5.3. System state prior to Use-case execution: The user must be successfully logged into the system.

**6. Use-case View Registration Requests**

6.1. Summary: Allows a librarian or administrator to view a list of online reader registration applications currently awaiting approval.

6.2. Flow of Events:

6.2.1. Main Flow:

1.	The librarian selects the "Approve Card Registration Request" function on the dashboard.
2.	The system queries the database and displays a list of reader account registration applications with the status "Pending Approval," sorted chronologically with the most recent applications appearing first.
3.	The librarian can click on individual applications to review details regarding personal information fields and attached documents (if any).

6.3. Special Requirements: The list of registration requests must be paginated to optimize page loading performance when the volume of requests is high.

6.4. System State Prior to Use Case Execution: The librarian or administrator is successfully logged into the system.

6.5. Extension Points:

o	Use Case: Approve Reader Card Issuance – The librarian selects and approves a valid application from the pending list to proceed with card issuance and official account activation.

**7. Use-case Approve Reader Card Issue**

7.1. Summary: Approve a valid account registration request, activate the library card, and generate an identification QR code to send to the reader.

7.2. Flow of Events:

7.2.1. Main Flow:

1.	The librarian selects the reader profile requiring approval from the list of pending requests.
2.	The librarian clicks the "Approve Card Issuance" button.
3.	The system generates a unique reader ID (ReaderID) and automatically creates a barcode/identification QR code representing the reader's library card.
4.	The system updates the reader account status from "Pending Approval" to "Active" and sets the start and expiration dates for the library card according to established configurations.
5.	The system sends an approval confirmation email containing the membership card QR code image to the reader's email address.
6.	The system displays a notification indicating successful approval.

7.3. System state prior to Use-case execution: The librarian is viewing the details of the reader's registration profile.

7.4. System state after Use-case execution: The reader account status changes to "Active" in the database, and the library card is successfully activated.

**8. Use-case Search Books**

8.1. Summary: Allows all user types (Visitors, Readers, Librarians) to search for library materials based on various criteria.

8.2. Flow of Events:

8.2.1. Main Flow:

1.	The user selects the material search function from the search toolbar.
2.	The user enters search keywords (Title, Author, Genre, or book code) and may optionally apply advanced filters (Publication Year, Publisher, Language).
3.	The system queries the D2 database (Books & BookCopies) to find records matching the keywords.
4.	The system displays a list of results, including: cover image, title, author, genre, and the number of copies currently available on the library shelves.
5.	The user can choose to sort the results list (alphabetically, by entry date, or by loan count) or select an item to view details, such as the content summary and shelf location.

8.3. Special Requirements: Search results must be displayed instantly (response time under 2 seconds for a database of up to 100,000 titles), and the system must support searches without diacritics and approximate (fuzzy) matching.

8.4. Extension Points:

o	Reserve Book Use Case: Readers with an official account can place a reservation for a book from the book details interface.

o	Add to Online Wishlist Use Case: Readers can choose to save a book to their personal wishlist.

**9. Use-case Reserve Book**

9.1. Summary: Allows logged-in patrons to place a hold on a book copy currently available on the shelf before visiting the library to borrow it in person, preventing it from being borrowed by someone else.

9.2. Flow of events:

9.2.1. Main flow:

1.	The patron selects the "Place Hold" function on the details page of the book they wish to borrow.
2.	The system checks the patron's account eligibility: The account must be "Active," the library card must not be expired, there must be no outstanding overdue fines, and the total number of currently borrowed books plus books on hold must not exceed the maximum allowed limit.
3.	The system checks the availability of the physical book copy on the shelf.
4.	If all conditions are met, the system changes the book copy's status from "Available" to "Reserved" and sets a hold expiration time (e.g., a maximum of 24 hours from the time the hold was placed).
5.	The system saves the hold information and generates a confirmation QR code, sending it to the patron's mobile app or email.

9.2.2. Alternative flows:

o	If the patron's account is locked or the card is expired: The system rejects the transaction and displays a notification stating the specific reason.

o	If the patron has overdue borrowed books or unpaid fines: The system displays a notification rejecting the hold request and asks the patron to settle the fines at the counter before initiating a new transaction.

9.3. System state before the use case begins: The patron is logged in and viewing the details of the book they wish to place on hold.

9.4. System state after the use case is completed: The book copy status is updated to "Reserved" in the database, and the successful hold is recorded in the history.

**10. Use-case Add to Online Wishlist**

10.1. Summary: Allows readers to save favorite titles or those needed for future reference to a personal online list.

10.2. Flow of events:

10.2.1. Main flow:

1.	The reader clicks the "Add to Wishlist" button on the book details page.
2.	The system records the association between the ReaderID and the corresponding BookID.
3.	The system updates the reader's personal online Wishlist and displays the notification "Saved to Wishlist".

10.3. System state prior to Use-case execution: The reader has successfully logged into the system.

10.4. System state after Use-case execution: The book title has been successfully added to the reader's personal online Wishlist.

**11. Use-case Remove from Online Wishlist**

11.1. Summary: Allows readers to remove book titles they are no longer interested in from their personal online wishlist.

11.2. Flow of Events:

11.2.1. Main Flow:

1.	The reader accesses the "My Wishlist" page.
2.	The system displays the full list of saved book titles.
3.	The reader clicks the "Delete" or "Remove" icon/button next to the corresponding book title.
4.	The system deletes the corresponding record link in the database.
5.	The system reloads the list page and displays a success notification.

11.3. System State Before Use Case Execution: The reader has successfully logged in and is viewing their personal wishlist.

11.4. System State After Use Case Execution: The book title has been successfully removed from the personal wishlist, and the database state has been updated.

**12. Use-case Process Borrowing**

12.1. Summary: The core circulation desk function allows the librarian to receive requests, verify constraints, and create physical book loan records for patrons.

12.2. Flow of Events:

12.2.1. Main Flow:

1.	The patron presents their library card and the books to be borrowed at the service desk.
2.	The librarian initiates the "Create Loan Record" function in the software.
3.	The librarian scans the patron's library card QR code or barcode.
4.	The system automatically verifies the library card status.
5.	Once the card is validated, the librarian uses a barcode scanner to scan the barcode (CopyID) affixed to each physical book being borrowed.
6.	The system checks the availability of each book copy in the database and verifies the patron's borrowing limits (ensuring the maximum allowed quantity is not exceeded).
7.	The librarian reviews the information displayed on the screen and clicks "Confirm Loan."
8.	The system initiates a new loan transaction in the database: it creates a `BorrowRecord` (containing the transaction ID, patron ID, loan date, and processing librarian ID) and creates `BorrowDetail` records corresponding to each borrowed book (setting the `DueDate` to 14 days from the loan date, per general policy).
9.	The system updates the status of the book copies in the `BookCopy` table from "Available" to "On borrow" and simultaneously decrements the available stock count.

12.3. Special Requirements: The entire process of scanning codes and processing loan transactions must ensure data integrity (utilizing a transaction mechanism so that if a single loan detail fails, the entire transaction is rolled back to prevent data inconsistency). The barcode scanning response time must be less than 1.5 seconds.

12.4. System state prior to Use-case execution: The librarian has successfully logged into the system and is working on the loan slip creation screen.

12.5. System state after Use-case execution: The loan slip has been successfully created; book status data and the patron's borrowing limits have been instantly updated in the database.

12.6. Extension point:

o	Print Receipt Use-case: The system automatically proceeds to the physical loan slip printing flow for the patron to sign and confirm after the borrowing transaction is completed.

**13. Use-case Verify Reader Card**

13.1. Summary: The system automatically reviews and checks the validity and potential constraint violations of the reader's library card before allowing subsequent circulation transactions to proceed.

13.2. Flow of events:

13.2.1. Main flow:

1.	The system receives the ReaderID from the book borrowing or renewal process.
2.	The system checks the reader card's expiration date (CardExpiryDate) against the current date.
3.	The system checks the card's operational status in the database (it must be "Active").
4.	The system counts the number of books currently borrowed and unreturned by the reader (using the BorrowDetail table) and compares this against the maximum borrowing limit allowed for the reader's category (e.g., Student, Faculty).
5.	The system checks if the reader has any overdue books (past the due date) or any outstanding penalty invoices marked as "Pending Payment."
6.	If all checks pass, the system returns a successful validation result and displays a summary of the reader's information on the librarian's interface.

13.2.2. Alternative flows:

o	If the card is expired or temporarily blocked: The system emits a warning sound and displays an error message detailing the reason for rejection on the librarian's screen. The use case terminates.

o	If the reader holds overdue books or has unpaid penalties: The system reports a circulation policy violation and blocks the reader from borrowing new books until the violation is resolved.

13.3. System state prior to use case execution: The system has received the reader's library card ID as input from a circulation process.

**14. Use-case View Borrowing History**

14.1. Summary: Allows the reader to view their complete borrowing and return history via their online OPAC account.

14.2. Flow of Events:

14.2.1. Main Flow:

1.	The reader selects the "Borrowing History" function on their personal account management page.
2.	The system queries the `BorrowRecord` and `BorrowDetail` tables, filtering by the `ReaderID` of the currently logged-in reader.
3.	The system displays a list of all borrowing transactions, sorted chronologically from newest to oldest. Information displayed for each book includes: Title, Borrow Date, Due Date, Actual Return Date (if applicable), status (On Loan, Returned, Overdue), and any incurred fines.

14.3. System State Prior to Use-Case Execution: The reader has successfully logged into the system.

14.4. Extension Points:

o	"Renew Books Online" Use-Case: The reader can click the "Renew" button next to any book currently "On Loan" that is eligible for renewal.

**15. Use-case Renew Books Online**

15.1. Summary: Readers can renew their book loans online via the mobile app or web interface without needing to bring the books to the library in person.

15.2. Flow of events:

15.2.1. Main flow:

1.	The reader accesses the screen displaying the list of currently borrowed books.
2.	The reader clicks the "Renew Online" button next to the specific book they wish to renew.
3.	The system automatically checks a series of renewal constraints:
o	The book is not currently reserved by another reader in the system.
o	The reader's account is not locked, there are no other overdue borrowed books, and there are no outstanding fines.
o	The number of renewals for this book has not exceeded the library's maximum limit (maximum of 4 consecutive renewals per title).
4.	If all conditions are met, the system updates the new due date for the corresponding loan record (the new due date is set to 14 days after the original due date) and increments the renewal count by one.
5.	The system displays a "Renewal Successful" notification, clearly showing the new due date to the reader.

15.2.2. Alternative flows:

o	If the book is reserved by someone else or renewal constraints are violated: The system displays a renewal rejection notification with the specific reason (e.g., "Book is already reserved" or "You have exceeded the allowed number of renewals"). The book's original due date remains unchanged.

15.3. System state prior to Use-case execution: The reader has successfully logged in and is currently on the interface for managing their borrowed book history. 
15.4. System state after Use-case execution: The due date for the borrowed book is updated to 14 days later in the database, and the transaction history records the new status.

**16. Use-case Over-the-Counter Renewal**

16.1. Summary: The librarian receives the request and processes the book loan extension directly for the patron at the circulation desk.

16.2. Flow of Events:

16.2.1. Main Flow:

1.	The patron brings the book or their library card to the desk to request a due date extension.
2.	The librarian scans the patron's library card to verify their account status.
3.	The librarian scans the barcode of the book the patron wishes to renew.
4.	The system checks business constraints similar to the online process (e.g., the book has no pending reservations, the patron has no other overdue books, and the renewal count has not exceeded four times).
5.	The librarian clicks the "Confirm In-Person Renewal" button.
6.	The system executes a transaction to update the due date in the database's `BorrowDetail` table, extending it by 14 days.
7.	The system displays a successful renewal notification on the librarian's screen.

16.3. System State Before Use-Case Execution: The librarian is logged in and positioned at the circulation desk interface.

16.4. System State After Use-Case Execution: The book's new due date has been successfully updated in the database.

16.5. Extension Points:

o	Print Receipt Use-Case: The system prints a receipt confirming the new due date for the patron's records.

**17. Use-case Process Return**

17.1. Summary: The librarian receives physical books returned by patrons at the counter, completes the return transaction, and checks for any violations.

17.2. Flow of events:

17.2.1. Main flow:

1.	The patron brings the physical book to the circulation counter to return it.
2.	The librarian opens the "Book Return" screen in the software.
3.	The librarian scans the barcode (CopyID) affixed to the physical book.
4.	The system automatically searches for the active loan record (BorrowDetail) corresponding to the scanned barcode to retrieve the ReaderID, DateBorrow, and DueDate.
5.	The librarian physically inspects the book (checking pages for tears, stains, scribbles, missing pages, or a torn cover).
6.	The librarian records the book's actual condition upon return in the software (e.g., "Intact," "Torn cover," "Missing pages," "Lost book").
7.	The system updates the "Actual return date" field in the BorrowDetail table with the current date.
8.	The system updates the status of the book copy in the BookCopy table from "On borrow" back to "Available" and increments the available shelf inventory count for that book title.
9.	The system removes the returned book from the patron's list of currently borrowed items.

17.3. System state before starting the use case: The librarian has successfully logged in and is working within the book return processing interface.

17.4. System state after executing the use case: The return transaction is recorded, and the physical book's status in the inventory is restored to "Available" for future loans.

17.5. Extension points:

o	"Issue Fine Ticket" use case: Automatically triggered when the system detects that the actual return date is later than the scheduled due date, or when the librarian records a returned book as torn, missing pages, or lost.

o	"Print Receipt" use case: The system automatically prints a return confirmation slip for the patron upon completion.

**18. Use-case Issue Fine Ticket**

18.1. Summary: Generate a library violation fine record when a patron returns a book late, damages it, or loses it, and apply the corresponding penalty.

18.2. Flow of Events:

18.2.1. Main Flow:

1.	The system automatically calculates the number of overdue days (if applicable): OverdueDays = ActualReturnDate - DueDate.
2.	The system applies automatic fine calculation rules based on library policy to determine the specific fine amount (e.g., 5,000 VND per overdue day).
3.	For cases of physical damage (torn cover, graffiti, missing pages, lost book) entered by the librarian, the system applies compensation rates based on the established schedule of charges.
4.	The system automatically creates a new fine record in the FineReceipt table, including: FineID, original loan transaction ID, detailed violation description, total fine amount, and creation date; it sets the fine status to "Pending Payment."
5.	The system automatically updates the patron's account status in the Reader table to "Temporarily Suspended," blocking all future borrowing or renewal privileges until the fine is paid.
6.	The system displays detailed fine information on the librarian's screen and sends a fine payment reminder via email or the patron app.

18.3. System State Before Use Case Execution: The system detects a deadline violation or an issue with the book's condition during the return process at the counter.

18.4. System State After Use Case Execution: The violation fine record is successfully saved to the database with a "Pending Payment" status, and the patron's account is securely suspended across the system.

18.5. Extension point:

o	"Collect Fine Payment" use case: The librarian collects fine payments directly from the patron at the circulation desk to clear outstanding fine balances.

**19. Use-case Collect Fine Payment**

19.1. Summary: Accept fine payments from patrons in violation, update the invoice status to "Paid," and restore the patron's card privileges.

19.2. Flow of Events:

19.2.1. Main Flow:

1.	The patron pays in cash at the counter or makes a bank transfer.
2.	The librarian searches for the patron's fine slip code in the fine management software.
3.	The librarian verifies the amount due and clicks the "Confirm Fine Payment" button.
4.	The system updates the fine slip status in the `FineReceipt` table from "Pending Payment" to "Paid" and records the actual payment date and the processing librarian's ID.
5.	The system automatically checks if the patron has any other unpaid fine slips. If the patron has cleared all outstanding fines, the system automatically changes the patron's card status in the `Reader` table from "Temporarily Suspended" back to "Active."
6.	The system displays a notification confirming the successful payment update.

19.3. System State Before Use-Case Execution: The patron has a fine slip with an unpaid status, and the librarian has selected the correct fine slip to process.

19.4. System State After Use-Case Execution: The fine slip status is updated to "Paid" in the database, and the patron's account is unblocked, restoring normal borrowing privileges.

19.5. Extension Points:

o	Print Receipt Use-Case: The system prints a fine payment receipt to provide to the patron for reconciliation purposes.

**20. Use-case Print Receipt**

20.1. Summary: Print a physical receipt at the counter to serve as proof of transaction completion (book loan slip, book return slip, or fine payment receipt) and hand it to the patron.

20.2. Flow of Events:

20.2.1. Main Flow:

1.	A circulation transaction (book loan, book return, or fine collection) is successfully confirmed in the system.
2.	The system sends formatted receipt data (containing the transaction ID, patron's name, list of books/violations, amount, timestamp, and librarian's name) to the dedicated thermal printer connected at the counter.
3.	The printer successfully outputs the physical receipt for the patron and logs the printing event in the system log file.

20.3. System State Prior to Use Case Execution: The corresponding circulation transaction has been successfully recorded and stored in the database.

**21. Use-case Manage Book Catalog**

21.1. Summary: Enables librarians and administrators to manage the lifecycle of library books and materials, including functions to add new items, update information, and delete books.

21.2. Flow of Events:

21.2.1. Main Flow:

1.	The user selects the "Book Catalog Management" function on the system interface.
2.	The system displays the complete list of existing book titles along with advanced search and filtering tools.
3.	The user may select one of the following actions:

o	Add new book title: Enter the book's metadata (title, publication year, author information, publisher, genre). The system checks for duplicate information, adds the new data to the "Book" table, automatically generates a copy code (CopyID), and prints a barcode label.

o	Update book: Select the book title to be modified, edit publication details or the quantity of copies available on the shelf, and then click confirm to save the new information to the database, overwriting the old data.

o	Delete book: Select the book title or physical copy to be deleted (e.g., due to damage or obsolescence requiring disposal); the system requests confirmation of the deletion action.

21.2.2. Alternative Flows:

o	Deletion blocked by foreign key constraint: If the user attempts to delete a book that has a recorded borrowing/returning history, the system detects a foreign key constraint (RESTRICT rule from the loan details table) and prevents physical deletion to maintain data integrity. The system displays a warning error message and automatically guides the user to change the book's status to "Liquidation" (Soft Delete), hiding it from the OPAC while preserving transaction history.

21.3. System state prior to Use-case execution: The Librarian or Admin is successfully logged into the system and possesses the authority to manage the document catalog.

21.4. System state after Use-case execution: The book catalog database (D2: Books & BookCopies) is updated, and the modifications are successfully recorded.

**22. Use-case Manage Reader Accounts**

22.1. Summary: Allows librarians and administrators to manage patron profile information, approve profile modifications, and control the activation/lock status of patron cards.

22.2. Flow of events:

o	22.2.1. Main flow:

1.	The user accesses the "Patron Account Management" function within the administration software.
2.	The system displays a list of all patrons in the database, accompanied by account status filters ("Active", "Pending", "Suspended").
3.	The user performs management actions:

o	Update profile: Modify contact information (permanent address, phone number, email) based on patron requests and extend the library card's validity period.

o	Manually lock account: Proactively change the patron status to "Locked" (card locked) in cases of serious library rule violations, reported lost cards, or requests to discontinue service.

o	Unlock account: Change the patron status back to "Active" after the patron has resolved policy violations or paid required fines.

22.3. Special requirements: The displayed list of patrons must be fully paginated to ensure optimized database query speed.

22.4. System state prior to Use-case execution: The user has successfully logged into the system and possesses the necessary permissions for patron account management.

22.5. System state after Use-case execution: The patron information database (D1: Readers) has been successfully updated with the new status.

**23. Use-case Manage Staff Accounts**

23.1. Summary: High-privilege Administrator (Admin) functionality used to manage personnel records, issue operational accounts, and assign permissions to library staff.

23.2. Flow of Events:

23.2.1. Main Flow:

1.	The Administrator (Admin) logs into the system and selects the "Staff Account Management" function.
2.	The system displays a list of current library staff, including details on their positions and departments.
3.	The Admin performs the following actions:

o	Issue new account: Enter personnel details (full name, date of birth, gender, ID card number, position, base salary) and assign a username and initial system password.

o	Role Assignment: Assign specific operational permissions to staff (e.g., Circulation Librarian, Cataloging/Collection Management Librarian, or Financial Reporting Librarian).

o	Deactivate account: Change the staff account status to "Inactive" or delete the account upon staff resignation to revoke all access to the library system.

23.3. System state prior to Use-case execution: The Administrator is logged into the system with full administrative privileges (Admin).

23.4. System state after Use-case execution: The library staff database (D5: Staffs) is accurately updated, and all permission changes take effect immediately upon the next login session.

**24. Use-case Statistics & Reports**

24.1. Summary: Supports the generation of detailed statistics, visualizations of book circulation activity, and financial reports on fines for library management.

24.2. Flow of Events:

24.2.1. Main Flow:

1.	The user (Staff or Admin) selects the "Statistics & Reports" function on the management screen.
2.	The user selects the desired report type:
o	Daily/weekly circulation report (borrowing and returning) (used by librarians).
o	List of overdue, unreturned books.
o	Financial report on fine revenue (used by Admins).
o	Statistics on borrowing frequency by genre to support new material acquisition.
3.	The user configures the time range for filtering the data to be reported.
4.	The system queries data from all data repositories (D1, D2, D3, D4), calculates statistical indicators (KPIs), and displays visual data tables on the screen.
5.	The user can select the "Export Report" function to generate standard PDF files or Excel spreadsheets for printing, sharing, or archiving.

24.3. Special Requirements: The data statistics process operates strictly in "Read-only" mode; it must not perform any operations that overwrite or alter the static data state of database tables, ensuring absolute data integrity.

24.4. System State Prior to Use-Case Execution: The user has successfully logged in and possesses the appropriate permissions to view statistical reports.



  	 
