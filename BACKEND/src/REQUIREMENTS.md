# YÊU CẦU MÔI TRƯỜNG VÀ CẤU HÌNH HỆ THỐNG (BACKEND)

Tài liệu hướng dẫn thiết lập môi trường để chạy dự án Spring Boot Backend.

## 1. Yêu cầu công cụ & Phần mềm (Prerequisites)
- **Java Development Kit (JDK):** Java 21 (JDK 21).
- **Framework:** Spring Boot 3.x.x (Cấu hình dự án dùng 3.2.3).
- **Build Tool:** Apache Maven 3.8+ (đã tích hợp trong IDE hoặc dùng Maven Wrapper).
- **Database Management System:** MySQL 8.0+.
- **IDE đề xuất:** Visual Studio Code (Extension Pack for Java, Spring Boot Extension Pack) hoặc IntelliJ IDEA.

## 2. Các dependency chính
- Spring Web
- Spring Data JPA
- Spring Security & JJWT (0.11.5)
- MySQL Connector/J

## 3. Cấu hình Cơ sở dữ liệu (Database Setup)
1. Mở MySQL và tạo một database mới tên là `library_db`.
2. Kiểm tra lại thông tin kết nối trong file `src/resources/application.yml` (hoặc `properties`):
   ```yaml
   spring:
     datasource:
       url: jdbc:mysql://localhost:3306/library_db?useSSL=false&serverTimezone=UTC
       username: root
       password: <mat_khau_mysql_local>
     jpa:
       hibernate:
         ddl-auto: update
       show-sql: true
