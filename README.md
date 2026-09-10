# Group5 Library Management System

┌─────────────────────────────────────────────────────────────┐
│                     CLIENT LAYER                            │

│  (Web Portal - React, Mobile App - Flutter, Staff Desktop)  │

└────────────────────────┬────────────────────────────────────┘

                         │
┌────────────────────────▼────────────────────────────────────┐

│                  API GATEWAY LAYER                          │

│  (Rate Limiting, Request Validation, Routing)               │

└────────────────────────┬────────────────────────────────────┘

                         │
┌────────────────────────▼────────────────────────────────────┐

│              AUTHENTICATION & AUTHORIZATION                 │

│  (JWT Token, Role-Based Access Control, Session Mgmt)       │

└────────────────────────┬────────────────────────────────────┘

                         │
┌────────────────────────▼────────────────────────────────────┐

│                BUSINESS LOGIC LAYER                         │

│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐   │

│  │ Reader   │ Book     │ Borrow   │ Fine     │ Report   │   │

│  │ Service  │ Service  │ Service  │ Service  │ Service  │   │

│  └──────────┴──────────┴──────────┴──────────┴──────────┘   │

└────────────────────────┬────────────────────────────────────┘

                         │
┌────────────────────────▼────────────────────────────────────┐

│                 DATA ACCESS LAYER (DAO)                     │

│  (Repository Pattern, Query Optimization)                   │

└────────────────────────┬────────────────────────────────────┘

                         │
┌────────────────────────▼────────────────────────────────────┐

│              DATABASE & CACHE LAYER                         │

│  ┌──────────────────┬──────────────────┐                    │

│  │   MySQL          │   Redis Cache    │                    │

│  │   (Main DB)      │   (Session/Data) │                    │

│  └──────────────────┴──────────────────┘                    │

└─────────────────────────────────────────────────────────────┘


library-management-backend/

│

├── src/main/java/com/library/

│   ├── config/                          # Cấu hình ứng dụng

│   │   ├── SecurityConfig.java          # Spring Security, JWT

│   │   ├── DatabaseConfig.java          # Kết nối DB

│   │   ├── CacheConfig.java             # Redis Cache

│   │   ├── CorsConfig.java              # CORS Policy

│   │   ├── WebMvcConfig.java            # Register Interceptor Additional

│   │   └── JpaAuditingConfig.java       # Audit Trail

│   │

│   ├── controller/                      # REST API Endpoints

│   │   ├── AuthController.java          # Đăng nhập, đăng ký

│   │   ├── ReaderController.java        # Quản lý độc giả

│   │   ├── BookController.java          # Quản lý sách

│   │   ├── BorrowController.java        # Quản lý mượn sách

│   │   ├── ReturnController.java        # Quản lý trả sách

│   │   ├── FineController.java          # Quản lý phạt

│   │   ├── ReservationController.java   # Đặt sách

│   │   ├── StaffController.java         # Quản lý nhân viên

│   │   ├── ReportController.java        # Báo cáo thống kê

│   │   └── AdminController.java         # Admin functions

│   │

│   ├── service/                         # Business Logic

│   │   ├── AuthService.java             # Logic xác thực

│   │   ├── ReaderService.java           # Logic độc giả

│   │   ├── BookService.java             # Logic sách

│   │   ├── BorrowService.java           # Logic mượn

│   │   ├── ReturnService.java           # Logic trả sách

│   │   ├── FineService.java             # Logic phạt

│   │   ├── ReservationService.java      # Logic đặt sách

│   │   ├── NotificationService.java     # Email, SMS, In-app

│   │   ├── ReportService.java           # Tạo báo cáo

│   │   ├── StaffService.java            # Quản lý nhân viên

│   │   └── PaymentService.java          # Tích hợp thanh toán

│   │

│   ├── repository/                      # Data Access Layer

│   │   ├── ReaderRepository.java

│   │   ├── AdminRepository.java

│   │   ├── BookRepository.java

│   │   ├── BookCopyRepository.java

│   │   ├── BorrowRecordRepository.java

│   │   ├── BorrowDetailRepository.java

│   │   ├── FineReceiptRepository.java

│   │   ├── AuthorRepository.java

│   │   ├── PublisherRepository.java

│   │   ├── CategoryRepository.java

│   │   ├── AuditLogRepository.java

│   │   ├── ReservationRepository.java

│   │   ├── WishlistRepository.java

│   │   ├── StaffRepository.java

│   │

│   ├── entity/                          # JPA Entities (Database Models)

│   │   ├── Reader.java

│   │   ├── Book.java

│   │   ├── BookCopy.java

│   │   ├── BorrowRecord.java

│   │   ├── BorrowDetail.java

│   │   ├── FineReceipt.java

│   │   ├── FineReceiptDetail.java

│   │   ├── Reservation.java

│   │   ├── Wishlist.java

│   │   ├── Staff.java

│   │   ├── Admin.java

│   │   ├── Author.java

│   │   ├── Category.java

│   │   ├── Publisher.java

│   │   └── AuditLog.java               # Ghi log mọi thao tác

│   │

│   ├── dto/                             # Data Transfer Objects

│   │   ├── request/

│   │   │   ├── RegisterReaderDTO.java

│   │   │   ├── LoginDTO.java

│   │   │   ├── CreateBorrowDTO.java

│   │   │   ├── ProcessReturnDTO.java

│   │   │   └── ...

│   │   └── response/

│   │       ├── ReaderResponseDTO.java

│   │       ├── BookResponseDTO.java

│   │       ├── BorrowResponseDTO.java

│   │       └── ...

│   │

│   ├── security/                        # Bảo mật

│   │   ├── JwtTokenProvider.java        # Token generation/validation

│   │   ├── JwtAuthenticationFilter.java # Filter

│   │   ├── JwtAuthenticationEntryPoint

│   │   ├── CustomAccessDeniedHandler

│   │   ├── CustomUserDetailsService.java# User load

│   │   ├── UserPrincipal

│   │   └── UserRole


│   │

│   ├── exception/                       # Exception Handling

│   │   ├── GlobalExceptionHandler.java  # Global error handler

│   │   ├── ResourceNotFoundException.java

│   │   ├── InvalidOperationException.java

│   │   ├── AuthenticationException.java

│   │   └── ValidationException.java

│   │

│   ├── util/                            # Utilities

│   │   ├── DateUtils.java

│   │   ├── ValidationUtils.java

│   │   ├── EncryptionUtils.java

│   │   ├── BarcodeGenerator.java

│   │   ├── QRCodeGenerator.java

│   │   └── EmailValidator.java

│   │

│   ├── event/                           # Event-Driven Architecture

│   │   ├── BorrowCreatedEvent.java

│   │   ├── BookReturnedEvent.java

│   │   ├── FineIssuedEvent.java

│   │   ├── EventPublisher.java

│   │   └── EventListener.java

│   │

│   ├── scheduler/                       # Scheduled Tasks

│   │   ├── LibraryCardExpiryScheduler.java  # Cảnh báo hết hạn

│   │   ├── OverdueBookScheduler.java       # Xử lý quá hạn

│   │   ├── AutoFineCalculationScheduler.java # Tính tiền phạt tự động

│   │   ├── BackupScheduler.java           # Backup DB

│   │   └── ReportGenerationScheduler.java # Tạo báo cáo định kỳ

│   │

│   ├── async/                           # Async Processing

│   │   ├── AsyncConfig.java

│   │   ├── EmailSender.java             # Gửi email async

│   │   ├── SmsSender.java               # Gửi SMS async

│   │   └── NotificationProcessor.java

│   │

│   ├── validation/                      # Custom Validators

│   │   ├── EmailValidator.java

│   │   ├── PhoneNumberValidator.java

│   │   ├── CCCDValidator.java           # Kiểm tra CCCD

│   │   └── CaptchaValidator.java

│   │

│   ├── filter/                          # HTTP Filters

│   │   ├── RequestLoggingFilter.java

│   │   ├── RateLimitingFilter.java      # Giới hạn request

│   │   └── CorsFilter.java

│   │

│   ├── interceptor/                     # Request Interceptors

│   │   ├── AuditLogInterceptor.java

│   │   ├── PerformanceInterceptor.java  # Đo thời gian response

│   │   ├── RequestLoggingInterceptor

│   │   ├── CorrelationIdInterceptor

│   │   └── RateLimitInterceptor

│   │

│   ├── constant/                        # Hằng số

│   │   ├── ErrorMessages.java

│   │   ├── SuccessMessages.java

│   │   ├── ValidationConstants.java

│   │   ├── SecurityConstants.java

│   │   ├── StatusConstants

│   │   ├── BusinessRuleConstants

│   │   ├── AuditActionConstants

│   │   ├── RegexConstants

│   │   ├── BookConstants.java

│   │   ├── ReaderConstants.java

│   │   ├── BorrowConstants.java

│   │   ├── FineConstants.java

│   │   ├── ReservationConstants.java

│   │   ├── PaginationConstants.java

│   │   ├── RoleConstants

│   │   └── ApiPathConstants

│   │

│   └── LibraryManagementApplication.java # Main class

│

├── src/main/resources/

│   ├── application.yml                  # Cấu hình chính

│   ├── application-dev.yml              # Dev environment

│   ├── application-prod.yml             # Production environment

│   ├── db/

│   │   ├── migration/

│   │   │   ├── V1__Initial_Schema.sql

│   │   │   ├── V2__Add_Indexes.sql

│   │   │   └── ...

│   │   └── seed/

│   │       └── data.sql                 # Dữ liệu test

│   └── templates/

│       ├── email-templates/

│       │   ├── registration-confirmation.html

│       │   ├── password-reset.html

│       │   ├── fine-notification.html

│       │   └── card-expiry-warning.html

│       └── report-templates/

│           └── circulation-report.html

│

└── pom.xml                              # Maven dependencies
