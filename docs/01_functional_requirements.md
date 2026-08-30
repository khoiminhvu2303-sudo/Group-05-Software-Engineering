# 1. Process Description of Functional Requirements

## 1.1 Reader Management & Account Registration
* **FR1.1:** The system must allow users (readers) to provide basic information including full name, date of birth, gender, Citizen Identification (ID)/Identity Card number, phone number, address, and email address (used as the login username).
* **FR1.2:** The system must automatically check for duplicate data using the phone number, email address, or Citizen ID number against the database to prevent duplicate account creation.
* **FR1.3:** The system must set the account status to "Active" immediately after issuing a library card (either a physical card or an in-app QR code), granting the reader full privileges to borrow/return materials and access online services.
* **FR1.4:** The system must temporarily lock the reader's borrowing privileges and login access upon a rule violation, requiring library staff to manually unlock the account after the violation is resolved.
* **FR1.5:** The system must automatically send emails, SMS messages, or in-app notifications to remind readers 5 to 7 days before their library card expires.

## 1.2 Search and Reservation Process
* **FR2.1:** Readers must be able to search for materials through a search bar using keywords such as book title, author, genre, or Book ID.
* **FR2.2:** The system must display detailed material information including abstract, bibliographic details, publication date, storage location, and review history from other readers when a specific item is selected.
* **FR2.3:** The system must verify account eligibility (checking for overdue fines) before confirming the book reservation process.
* **FR2.4:** The system must send a successful reservation confirmation notification via email or app, attaching a QR code for the reader to present to staff upon pickup.

## 1.3 Borrowing, Renewal, and Return
* **FR3.1:** The system must reject a borrow transaction if the total number of currently borrowed books plus the books to be borrowed exceeds the library's prescribed limit.
* **FR3.2:** The system must automatically calculate the return due date based on library policy (default is 14 days from the borrowing date) and record it in the loan record.
* **FR3.3:** The system must allow readers to renew books online, provided that the book is not reserved by another reader, the account is not locked, there are no overdue books, and the renewal count has not exceeded 4 times per title.
* **FR3.4:** During the return process, the system must automatically compare the actual return date with the "Due Date"; if late, the system must set the status to "Late Return".
* **FR3.5:** The system must automatically calculate fine amounts based on business rules and generate a fine invoice containing the reason, fine amount, creation date, and a status of "Pending Payment" upon detecting a violation (late return, damaged, or lost book).

## 1.4 Staff & Role Management
* **FR4.1:** Each staff member using the system must be uniquely identified by an 8-digit staff ID.
* **FR4.2:** The system must allow Administrators (Admin) to manage staff profiles, work shifts, and assigned departments.
* **FR4.3:** The system must implement a Role-Based Access Control (RBAC) mechanism.
* **FR4.4:** The system must grant Administrators (Admin) full access privileges to all system functions.
* **FR4.5:** The system must restrict the privileges of Circulation Librarians to only executing book issues/returns and collecting fine payments.
* **FR4.6:** The system must restrict the privileges of Cataloging Staff to only managing book inventory and book titles.
* **FR4.7:** The system must automatically log a System Audit Log detailing every staff operation to ensure accountability.

## 1.5 Staff Operations at Counter
* **FR5.1:** The system must allow staff to scan a reader's library card (or QR code) to retrieve account information and check their active status.
* **FR5.2:** The system must allow staff to use a scanner to read the barcode of each book and verify its inventory status.
* **FR5.3:** The system must allow staff to manually log the physical condition/damage level of a book after performing a physical check (torn, missing pages, or dirty) when receiving returned books.
* **FR5.4:** The system must allow staff to confirm fine payments on the software, updating the invoice status to "Paid" and printing a receipt.
* **FR5.5:** The system must allow authorized staff or Administrators to export report data into formats such as PDF, Excel, or CSV for archiving or formal approval submission.

## 1.6 Statistics and Reporting Process
* **FR6.1:** The system must automatically collect and aggregate data across all operational sub-modules, including reader details, book catalog, borrowing/return history, and violation/fine records.
* **FR6.2:** The system must automatically generate periodic reports on a daily, weekly, monthly, or annual basis.
* **FR6.3:** The system must provide a Dashboard displaying real-time visual charts of borrowing trends or new reader registrations.
* **FR6.4:** Based on processed data, the system must identify high-demand ("hot") book titles facing stock shortages to recommend replenishment.
