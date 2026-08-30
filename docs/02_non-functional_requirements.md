# 2. Process Description of Non-Functional Requirements

## 2.1 Performance & Response Time:
- **NFR01 - Processing Speed:** The system shall process barcode scanning operations for circulation within 1.5 seconds per transaction.
- **NFR02 - Search Latency:** The system shall return Online Public Access Catalog (OPAC) search results within 2 seconds for a database containing up to 100,000 titles.

## 2.2 Security & Authorization:
- **NFR03 - Data Encryption:** The system shall encrypt all user passwords and sensitive personal data.
- **NFR04 - Session Timeout:** The system shall automatically terminate session access for librarian accounts after 15 minutes of inactivity.
- **NFR05 - Access Control:** The system shall enforce strict role-based access control requiring elevated authentication for critical operations, including deleting books, waiving fines, and exporting reports.

## 2.3 Reliability & Availability:
- **NFR06 - System Availability:** The system shall maintain an operational uptime of at least 99.5%, particularly during library operating hours.
- **NFR07 - Automated Backup:** The system shall execute automated daily database backups.

## 2.4 Scalability & Usability:
- **NFR08 - User Interface Responsiveness:** The system shall provide a user-friendly interface that is fully responsive across desktop devices (for Librarians) and mobile devices (for Readers).
- **NFR09 - System Integration:** The system shall support integration capabilities with third-party e-payment gateways (e.g., MoMo, VNPay) and automated access control gates.

## 2.5 Legal Compliance:
- **NFR10 - Tax & E-Invoicing Compliance:** The system shall issue electronic invoices and generate VAT tax reports automatically in compliance with Decree 123/2020/ND-CP.
- **NFR11 - Data Retention & Privacy:** The system shall retain financial transaction data for at least 10 years in accordance with Accounting Law, and protect personal data under Decree 13/2023/ND-CP.

## 2.6 Cost Efficiency:
- **NFR12 - Infrastructure Auto-Scaling:** The system shall utilize cloud infrastructure with auto-scaling capabilities to optimize operating costs based on system load.
- **NFR13 - Environment Cost Reduction:** The system architecture shall maintain development and staging environment expenses at least 60% lower than the production environment.
- **NFR14 - Software Cost Threshold:** The system shall support migration to open-source alternatives if third-party software licensing fees exceed pre-defined financial thresholds.
