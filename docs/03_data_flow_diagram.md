# 3. DETAILED DESCRIPTION OF DATA FLOW DIAGRAMS (DFD)

## 3.1. Level 0 Data Flow Diagram (Context Diagram)

The Level 0 Data Flow Diagram represents the highest-level view of the Library Management System (LMS). It models the entire system as a single central process—**(0.0 Library Management System)**—interacting with three primary external entities:

### 1. Reader
* **Incoming Data Flows to System:** Submits registration requests (*Registration Request*), book search and hold reservation queries (*Search & Reservation Query*), book borrowing requests (*Borrow Request*), and fine payments (*Fine Payment*).
* **Outgoing Data Flows from System:** Receives membership card details (*Membership Details*), reservation confirmations (*Reservation Confirmation*), borrowing receipts (*Borrow Receipt*), and requested library materials (*Requested Material*).

### 2. Staff
* **Incoming Data Flows to System:** Inputs scanned barcode data (*Barcode Scan Data*), updates physical book condition (*Book Condition Details*), submits user authentication credentials (*User Verification Data*), and enters fine payment receipts (*Fine Receipt Data*).
* **Outgoing Data Flows from System:** Receives real-time document availability status (*Book Availability Status*), circulation transaction confirmations (*Circulation Confirmation*), and operational activity logs (*Operational Logs*).

### 3. Admin
* **Incoming Data Flows to System:** Configures system parameters (*System Configuration*), manages access control and user roles (*Security Permission Data*), and submits report queries (*Report Query*).
* **Outgoing Data Flows from System:** Receives summary management reports (*Management Reports*) and system audit logs (*Audit Trail Logs*).

<img width="940" height="424" alt="image" src="https://github.com/user-attachments/assets/68db1839-9248-4754-b087-46eadc56d129" />

---

## 3.2. Level 1 Data Flow Diagram

The Level 1 DFD decomposes the central system process into seven core functional sub-processes and connects them directly to four central data stores: 
* **`D1: Catalog`** (Book Catalog & Inventory)
* **`D2: Reader_DB`** (Patron Profiles)
* **`D3: Borrow_Records`** (Loan, Return & Reservation Logs)
* **`D4: Fine_Records`** (Penalty & Payment Tickets)

### Core Processes Breakdown:
* **`1.0 Reader Management`:** Captures patron registration data, verifies personal credentials, generates new account records in **`D2: Reader_DB`**, and issues membership card details to the Reader.
* **`2.0 Document & Inventory Management`:** Enables Staff to enter new book details or update stock quantities, assigns unique barcodes, and records catalog metadata into **`D1: Catalog`**.
* **`3.0 Search & Book Reservation`:** Receives search requests from Readers, queries **`D1: Catalog`**, and returns matching results. When a Reader places a hold, the process checks account standing in **`D2: Reader_DB`**, updates item hold status in **`D1: Catalog`**, and records the reservation into **`D3: Borrow_Records`**.
* **`4.0 Circulation Management`:** Handles book checkout transactions. It verifies membership validity and fine status in **`D2: Reader_DB`** and checks physical item availability in **`D1: Catalog`**. Upon approval, it creates a new loan record in **`D3: Borrow_Records`**, updates item status to "On Loan" in **`D1: Catalog`**, and prints a checkout receipt for the Reader.
* **`5.0 Return & Renewal Management`:** Processes return scans or extension requests. It retrieves active loan data from **`D3: Borrow_Records`**. For extensions, it updates the due date in **`D3: Borrow_Records`**. For returns, it restores item availability to "Available" in **`D1: Catalog`**. If items are overdue or damaged, violation details are routed to Process 6.0.
* **`6.0 Fine & Payment Management`:** Receives violation flags from Process 5.0, calculates late fees or damage assessments, and records unpaid fine tickets into **`D4: Fine_Records`**. Upon receiving payment from the Reader, it marks the ticket as "Paid" and sends an unblock command to **`D2: Reader_DB`**.
* **`7.0 Staff & Report Management`:** Accepts report queries from Admin or Staff, aggregates real-time data from all four data stores (**`D1`**, **`D2`**, **`D3`**, **`D4`**), and generates statistical dashboards, circulation analytics, and financial summary reports.

<img width="1218" height="1352" alt="image" src="https://github.com/user-attachments/assets/bbd6f2b2-5ff0-4fef-ab61-3aff1e27ea45" />

---

## 3.3. Level 2 Data Flow Diagrams

### 3.3.1. Process 1.0 Breakdown - Reader Management
* **`Process 1.1 (Receive & Verify Information)`:** Collects applicant details (Full Name, National ID, Email, Phone Number) and validates input formatting.
* **`Process 1.2 (Validate & Approve Account)`:** Cross-checks applicant data against **`D2: Reader_DB`** to prevent duplicate accounts. Upon approval, it initializes the new patron profile.
* **`Process 1.3 (Issue Card & Store Data)`:** Generates a unique Reader ID and barcode identifier, commits account details to **`D2: Reader_DB`**, and outputs the card details to the Reader.

<img width="685" height="880" alt="image" src="https://github.com/user-attachments/assets/e6c1401a-c8a0-4e5c-b5dd-09f2cee67ebd" />

### 3.3.2. Process 2.0 Breakdown - Document & Inventory Management
* **`Process 2.1 (Receive & Catalog Books)`:** Accepts bibliographic details (Title, Author, Publisher, Genre) entered by Staff and writes preliminary metadata into **`D1: Catalog`**.
* **`Process 2.2 (Generate Barcode & Labeling)`:** Automatically generates unique item barcodes (Copy IDs) and maps shelf location labels.
* **`Process 2.3 (Save Information to System)`:** Links barcode tags to physical copies and updates total inventory stock counts in **`D1: Catalog`**.

<img width="922" height="751" alt="image" src="https://github.com/user-attachments/assets/f1dd5f65-cd4d-4852-9afa-f2c7375575a9" />

### 3.3.3. Process 3.0 Breakdown - Search & Book Reservation
* **`Process 3.1 (Look Up & Search Documents)`:** Parses multi-criteria search queries submitted by Readers, executes queries against **`D1: Catalog`**, and presents formatted results.
* **`Process 3.2 (Check Book Reservation Eligibility)`:** Verifies the Reader's standing in **`D2: Reader_DB`** (checking for active card status and absence of unpaid fines) and confirms item availability in **`D1: Catalog`**.
* **`Process 3.3 (Create & Update Book Reservation)`:** Updates item status to "Reserved" in **`D1: Catalog`**, creates a hold record in **`D3: Borrow_Records`**, and dispatches a confirmation notice to the Reader.

<img width="940" height="620" alt="image" src="https://github.com/user-attachments/assets/00cd02d8-b2e4-4da6-a075-180129b658d5" />

### 3.3.4. Process 4.0 Breakdown - Circulation Management (Checkout)
* **`Process 4.1 (Check Borrowing Eligibility)`:** Scans reader cards and book barcodes, checking membership validity in **`D2: Reader_DB`** and current shelf availability in **`D1: Catalog`**.
* **`Process 4.2 (Create Borrow Record)`:** Generates a loan transaction ID, sets standard due dates (e.g., 14 days), and commits transaction details to **`D3: Borrow_Records`**.
* **`Process 4.3 (Update Status & Hand Over Book)`:** Updates item availability to "On Loan" in **`D1: Catalog`**, decrements shelf counts, prints a borrowing receipt, and prompts Staff to hand over the physical book.

<img width="1077" height="578" alt="image" src="https://github.com/user-attachments/assets/42d56304-09d3-449c-bf78-4139ba188299" />

### 3.3.5. Process 5.0 Breakdown - Return & Renewal Management
* **`Process 5.1 (Receive & Verify Borrowing Slip)`:** Scans item barcodes to retrieve active transaction records from **`D3: Borrow_Records`**.
* **`Process 5.2 (Process Extension)`:** Verifies renewal rules (checking maximum extension limits and pending reservation holds). If valid, it computes the new due date and updates **`D3: Borrow_Records`**.
* **`Process 5.3 (Process Return & Check Violations)`:** Registers physical returns, marks transaction status as "Returned" in **`D3: Borrow_Records`**, and resets book status to "Available" in **`D1: Catalog`**. If overdue days or item damages are detected, violation details are forwarded directly to Process 6.0.

<img width="847" height="716" alt="image" src="https://github.com/user-attachments/assets/e3c527c9-c890-4ace-920a-c1486d895328" />

### 3.3.6. Process 6.0 Breakdown - Fine & Payment Management
* **`Process 6.1 (Lookup & Determine Fine)`:** Calculates penalty charges based on overdue days or damage condition tables and creates an unpaid fine ticket in **`D4: Fine_Records`**.
* **`Process 6.2 (Process Fine Payment)`:** Receives cash or electronic payments from the Reader, issues a payment receipt, and confirms payment completion.
* **`Process 6.3 (Update Violation Record)`:** Updates fine ticket status to "Paid" in **`D4: Fine_Records`** and sends account unblock notifications to **`D2: Reader_DB`**.

<img width="1127" height="708" alt="image" src="https://github.com/user-attachments/assets/7981f0fd-e3f9-4a37-8a87-e0675c888208" />

### 3.3.7. Process 7.0 Breakdown - Staff & Report Management
* **`Process 7.1 (Receive & Categorize Request)`:** Parses parameter filters (such as date ranges, category groups, or report types) submitted by Admin or Staff.
* **`Process 7.2 (Collect & Aggregate Data)`:** Executes read-only queries across **`D1: Catalog`**, **`D2: Reader_DB`**, **`D3: Borrow_Records`**, and **`D4: Fine_Records`** to summarize circulation trends and revenue metrics.
* **`Process 7.3 (Generate Report)`:** Formats aggregated datasets into printable reports, analytical charts, or exportable formats (PDF/Excel) for administrative decision-making.

<img width="1223" height="1148" alt="image" src="https://github.com/user-attachments/assets/e33223ca-6ef1-4762-acd6-7647c7a8ca1a" />
