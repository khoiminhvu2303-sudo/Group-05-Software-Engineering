-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: host.docker.internal    Database: library_management_system
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `AdminID` char(10) NOT NULL,
  `AdminName` varchar(50) NOT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Phone` char(10) DEFAULT NULL,
  `CCCD` char(12) DEFAULT NULL,
  `Salary` decimal(12,2) DEFAULT NULL,
  `NameLogin_Admin` varchar(50) NOT NULL,
  `Password_Admin` varchar(50) NOT NULL,
  PRIMARY KEY (`AdminID`),
  UNIQUE KEY `NameLogin_Admin` (`NameLogin_Admin`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `CCCD` (`CCCD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('ADM001','Phan Trung Kiên',NULL,'admin@library.vn','0909123456','079206003013',18000000.00,'admin@library.vn','123456');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `administrator`
--

DROP TABLE IF EXISTS `administrator`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrator` (
  `AdminID` char(10) NOT NULL,
  `AdminName` varchar(50) NOT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Phone` char(10) DEFAULT NULL,
  `CCCD` char(12) DEFAULT NULL,
  `Salary` decimal(12,2) DEFAULT NULL,
  `NameLogin_Admin` varchar(50) NOT NULL,
  `Password_Admin` varchar(255) NOT NULL,
  PRIMARY KEY (`AdminID`),
  UNIQUE KEY `NameLogin_Admin` (`NameLogin_Admin`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `CCCD` (`CCCD`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrator`
--

LOCK TABLES `administrator` WRITE;
/*!40000 ALTER TABLE `administrator` DISABLE KEYS */;
INSERT INTO `administrator` VALUES ('ADM001','Phan Trung Kiên',NULL,'admin@library.vn','0909123456','079206003013',18000000.00,'admin@library.vn','123456');
/*!40000 ALTER TABLE `administrator` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auditlog`
--

DROP TABLE IF EXISTS `auditlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auditlog` (
  `LogID` int NOT NULL AUTO_INCREMENT,
  `UserID` char(10) NOT NULL,
  `UserRole` varchar(20) NOT NULL,
  `Action` varchar(50) NOT NULL,
  `TableName` varchar(50) DEFAULT NULL,
  `Description` text,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`LogID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auditlog`
--

LOCK TABLES `auditlog` WRITE;
/*!40000 ALTER TABLE `auditlog` DISABLE KEYS */;
INSERT INTO `auditlog` VALUES (1,'RD00000001','Reader','CREATE_RESERVATION','Reservation','Độc giả đặt trước sách BK00000002','2026-09-01 08:30:00'),(2,'NV001','Staff','UPDATE_FINE','FineReceipt','Xác nhận thanh toán biên lai FR00000001','2026-09-02 11:20:00'),(3,'ADM001','Admin','ADD_STAFF','Staff','Thêm nhân viên mới vào hệ thống','2026-09-05 16:45:00');
/*!40000 ALTER TABLE `auditlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `author`
--

DROP TABLE IF EXISTS `author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `author` (
  `AuthorID` char(10) NOT NULL,
  `AuthorName` varchar(50) NOT NULL,
  `Note` text,
  `Birthday` date DEFAULT NULL,
  `Deathday` date DEFAULT NULL,
  PRIMARY KEY (`AuthorID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `author`
--

LOCK TABLES `author` WRITE;
/*!40000 ALTER TABLE `author` DISABLE KEYS */;
INSERT INTO `author` VALUES ('AUT001','Dale Carnegie','Tác giả cuốn Đắc Nhân Tâm','1888-11-24','1955-11-01'),('AUT002','Paulo Coelho','Tác giả cuốn Nhà Giả Kim','1947-08-24',NULL),('AUT003','Yuval Noah Harari','Tác giả cuốn Sapiens: Lược Sử Loài Người','1976-02-24',NULL),('AUT004','James Clear','Tác giả cuốn Atomic Habits','1986-01-22',NULL);
/*!40000 ALTER TABLE `author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `book` (
  `BookID` char(10) NOT NULL,
  `Title` varchar(100) NOT NULL,
  `Describe` text,
  `Publication` date DEFAULT NULL,
  `Stockquantity` int DEFAULT '0',
  `Status` varchar(50) DEFAULT 'Available',
  `AuthorID` char(10) NOT NULL,
  `PublisherID` char(10) NOT NULL,
  `CategoryID` char(10) NOT NULL,
  PRIMARY KEY (`BookID`),
  KEY `FK_Book_Author` (`AuthorID`),
  KEY `FK_Book_Publisher` (`PublisherID`),
  KEY `FK_Book_Category` (`CategoryID`),
  CONSTRAINT `FK_Book_Author` FOREIGN KEY (`AuthorID`) REFERENCES `author` (`AuthorID`),
  CONSTRAINT `FK_Book_Category` FOREIGN KEY (`CategoryID`) REFERENCES `category` (`CategoryID`),
  CONSTRAINT `FK_Book_Publisher` FOREIGN KEY (`PublisherID`) REFERENCES `publisher` (`PublisherID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book`
--

LOCK TABLES `book` WRITE;
/*!40000 ALTER TABLE `book` DISABLE KEYS */;
INSERT INTO `book` VALUES ('B000000001','Đắc Nhân Tâm','Sách kỹ năng sống','2020-01-01',10,'Available','AUT001','PUB0000001','CAT0000001'),('B000000002','Nhà Giả Kim','Tiểu thuyết văn học','2021-03-15',5,'Available','AUT002','PUB0000002','CAT0000002'),('B000000003','Sapiens','Lược sử loài người','2019-05-20',8,'Available','AUT003','PUB0000002','CAT0000003'),('BK00000002','Đắc Nhân Tâm (Bản mới)','Tái bản mới','2022-01-01',5,'Available','AUT001','PUB0000001','CAT0000001'),('BK00000005','Atomic Habits','Thói quen nguyên tử','2021-08-10',3,'Available','AUT004','PUB0000002','CAT0000001'),('BK00000010','Lược Sử Tương Lai','Khoa học lịch sử','2020-11-11',4,'Available','AUT003','PUB0000003','CAT0000003');
/*!40000 ALTER TABLE `book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookcopy`
--

DROP TABLE IF EXISTS `bookcopy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookcopy` (
  `CopyID` char(10) NOT NULL,
  `BookID` char(10) NOT NULL,
  `Barcode` varchar(50) NOT NULL,
  `Status` varchar(50) DEFAULT 'Available',
  `Condition` varchar(50) DEFAULT NULL,
  `Price` decimal(12,2) DEFAULT NULL,
  `CreatedAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `UpdatedAt` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`CopyID`),
  UNIQUE KEY `Barcode` (`Barcode`),
  KEY `FK_BookCopy_Book` (`BookID`),
  CONSTRAINT `FK_BookCopy_Book` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`) ON DELETE CASCADE,
  CONSTRAINT `bookcopy_chk_1` CHECK ((`Status` in (_utf8mb4'Available',_utf8mb4'Borrowed',_utf8mb4'Reserved',_utf8mb4'Lost',_utf8mb4'Damaged')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookcopy`
--

LOCK TABLES `bookcopy` WRITE;
/*!40000 ALTER TABLE `bookcopy` DISABLE KEYS */;
INSERT INTO `bookcopy` VALUES ('CP00000001','B000000001','BC-MB-001','Available','Mới',110000.00,'2024-01-15 08:30:00','2024-01-15 08:30:00'),('CP00000002','B000000001','BC-MB-002','Borrowed','Cũ nhẹ',110000.00,'2024-01-15 08:30:00','2024-02-10 14:20:00'),('CP00000003','B000000002','BC-TV-001','Reserved','Mới',85000.00,'2024-02-01 09:00:00','2024-02-05 10:15:00'),('CP00000004','B000000003','BC-HP-001','Available','Mới',250000.00,'2024-02-15 11:45:00','2024-02-15 11:45:00');
/*!40000 ALTER TABLE `bookcopy` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_update_bookcopy_status` AFTER UPDATE ON `bookcopy` FOR EACH ROW BEGIN
    DECLARE total INT DEFAULT 0;
    DECLARE avail INT DEFAULT 0;

    SELECT COUNT(*) INTO total FROM BookCopy WHERE bookID = NEW.bookID;
    SELECT COUNT(*) INTO avail FROM BookCopy WHERE bookID = NEW.bookID AND status = 'Available';

    UPDATE Book
    SET totalCopies = total,
        availableCopies = avail
    WHERE bookID = NEW.bookID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `borrowdetail`
--

DROP TABLE IF EXISTS `borrowdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrowdetail` (
  `BorrowDetailID` int NOT NULL AUTO_INCREMENT,
  `BorrowID` int NOT NULL,
  `CopyID` char(10) NOT NULL,
  `DueDate` date NOT NULL,
  `ActualReturnDate` date DEFAULT NULL,
  `RenewalCount` int DEFAULT '0',
  `ReturnCondition` varchar(20) DEFAULT NULL,
  `Status` varchar(50) DEFAULT 'On loan',
  PRIMARY KEY (`BorrowDetailID`),
  KEY `FK_BorrowDetail_BorrowRecord` (`BorrowID`),
  KEY `FK_BorrowDetail_BookCopy` (`CopyID`),
  CONSTRAINT `FK_BorrowDetail_BookCopy` FOREIGN KEY (`CopyID`) REFERENCES `bookcopy` (`CopyID`),
  CONSTRAINT `FK_BorrowDetail_BorrowRecord` FOREIGN KEY (`BorrowID`) REFERENCES `borrowrecord` (`BorrowID`) ON DELETE CASCADE,
  CONSTRAINT `borrowdetail_chk_1` CHECK ((`ReturnCondition` in (_utf8mb4'Good',_utf8mb4'Damaged',_utf8mb4'Lost'))),
  CONSTRAINT `borrowdetail_chk_2` CHECK ((`Status` in (_utf8mb4'On loan',_utf8mb4'Returned',_utf8mb4'Overdue')))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrowdetail`
--

LOCK TABLES `borrowdetail` WRITE;
/*!40000 ALTER TABLE `borrowdetail` DISABLE KEYS */;
INSERT INTO `borrowdetail` VALUES (1,1,'CP00000001','2026-01-15','2026-01-14',0,'Good','Returned'),(2,1,'CP00000002','2026-01-15','2026-01-20',0,'Good','Overdue'),(3,2,'CP00000004','2026-02-15','2026-02-10',0,'Damaged','Returned'),(4,3,'CP00000003','2026-03-15',NULL,0,'Lost','Overdue'),(5,4,'CP00000001','2026-04-15','2026-04-25',0,'Good','Overdue');
/*!40000 ALTER TABLE `borrowdetail` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_insert_borrowdetail` BEFORE INSERT ON `borrowdetail` FOR EACH ROW BEGIN
    DECLARE borrowDate DATE;
    -- Lấy ngày mượn từ BorrowRecord
    SELECT DATE(borrowDate) INTO borrowDate
    FROM BorrowRecord
    WHERE borrowID = NEW.borrowID;

    -- Gán dueDate mặc định = borrowDate + 14 ngày (FR3.2)
    SET NEW.dueDate = DATE_ADD(borrowDate, INTERVAL 14 DAY);
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_insert_borrowdetail` AFTER INSERT ON `borrowdetail` FOR EACH ROW BEGIN
    -- Cập nhật trạng thái bản sao thành 'On loan'
    UPDATE BookCopy
    SET status = 'On loan'
    WHERE copyID = NEW.copyID;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_update_borrowdetail_return` BEFORE UPDATE ON `borrowdetail` FOR EACH ROW BEGIN
    IF NEW.actualReturnDate IS NOT NULL AND OLD.actualReturnDate IS NULL THEN
        IF NEW.actualReturnDate > NEW.dueDate THEN
            SET NEW.status = 'Overdue';
        ELSE
            SET NEW.status = 'Returned';
        END IF;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_update_borrowdetail_renew` BEFORE UPDATE ON `borrowdetail` FOR EACH ROW BEGIN
    -- Nếu dueDate thay đổi => đang thực hiện gia hạn
    IF NEW.dueDate != OLD.dueDate THEN
        -- Kiểm tra số lần gia hạn (tối đa 4 lần – FR3.3)
        SET NEW.renewalCount = OLD.renewalCount + 1;
        IF NEW.renewalCount > 4 THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Số lần gia hạn vượt quá giới hạn (tối đa 4 lần)';
        END IF;

        -- Kiểm tra sách có đang bị đặt trước không (dựa vào status của BookCopy)
        IF EXISTS (
            SELECT 1 FROM BookCopy
            WHERE copyID = NEW.copyID AND status = 'Reserved'
        ) THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Không thể gia hạn vì sách đang bị đặt trước bởi bạn đọc khác';
        END IF;

        -- Kiểm tra tài khoản bạn đọc có bị khóa hoặc có phạt chưa trả không
        -- (có thể kiểm tra ở đây hoặc ở tầng ứng dụng)
        -- Tôi giả định đã kiểm tra ở tầng ứng dụng, nhưng có thể thêm:
        -- IF (SELECT cardStatus FROM Reader WHERE readerID = ... ) != 'Active' ...
        -- Tuy nhiên, để đơn giản, tôi để trigger này chỉ kiểm tra về sách và số lần gia hạn.
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_update_borrowdetail_return_actions` AFTER UPDATE ON `borrowdetail` FOR EACH ROW BEGIN
    DECLARE fineExists INT;

    IF NEW.actualReturnDate IS NOT NULL AND OLD.actualReturnDate IS NULL THEN
        -- 1. Cập nhật trạng thái sách thành Available
        UPDATE BookCopy
        SET status = 'Available'
        WHERE copyID = NEW.copyID AND status NOT IN ('Lost');

        -- 2. Tạo phiếu phạt nếu trễ hạn
        IF NEW.actualReturnDate > NEW.dueDate THEN
            SELECT COUNT(*) INTO fineExists FROM FineReceipt WHERE borrowDetailID = NEW.borrowDetailID;
            IF fineExists = 0 THEN
                INSERT INTO FineReceipt (
                    borrowDetailID,
                    reason,
                    amount
                ) VALUES (
                    NEW.borrowDetailID,
                    CONCAT('Trả sách trễ hạn ', DATEDIFF(NEW.actualReturnDate, NEW.dueDate), ' ngày'),
                    DATEDIFF(NEW.actualReturnDate, NEW.dueDate) * 5000
                );
            END IF;
        END IF;

        -- 3. Cập nhật BorrowRecord
        IF NOT EXISTS (
            SELECT 1 FROM BorrowDetail
            WHERE borrowID = NEW.borrowID AND actualReturnDate IS NULL
        ) THEN
            UPDATE BorrowRecord
            SET status = 'Completed'
            WHERE borrowID = NEW.borrowID;
        END IF;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `borrowrecord`
--

DROP TABLE IF EXISTS `borrowrecord`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `borrowrecord` (
  `BorrowID` int NOT NULL AUTO_INCREMENT,
  `ReaderID` char(10) NOT NULL,
  `StaffID` char(10) NOT NULL,
  `BorrowDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `Status` varchar(50) DEFAULT 'Active',
  PRIMARY KEY (`BorrowID`),
  KEY `FK_BorrowRecord_Reader` (`ReaderID`),
  KEY `FK_BorrowRecord_Staff` (`StaffID`),
  CONSTRAINT `FK_BorrowRecord_Reader` FOREIGN KEY (`ReaderID`) REFERENCES `reader` (`ReaderID`),
  CONSTRAINT `FK_BorrowRecord_Staff` FOREIGN KEY (`StaffID`) REFERENCES `staff` (`StaffID`),
  CONSTRAINT `borrowrecord_chk_1` CHECK ((`Status` in (_utf8mb4'Active',_utf8mb4'Completed')))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `borrowrecord`
--

LOCK TABLES `borrowrecord` WRITE;
/*!40000 ALTER TABLE `borrowrecord` DISABLE KEYS */;
INSERT INTO `borrowrecord` VALUES (1,'RD00000001','NV001','2026-01-01 09:00:00','Active'),(2,'RD00000002','NV002','2026-02-01 10:30:00','Active'),(3,'DG001','NV001','2026-03-01 14:00:00','Active'),(4,'DG002','NV003','2026-04-01 08:15:00','Completed');
/*!40000 ALTER TABLE `borrowrecord` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `CategoryID` char(10) NOT NULL,
  `CategoryName` varchar(50) NOT NULL,
  PRIMARY KEY (`CategoryID`),
  UNIQUE KEY `CategoryName` (`CategoryName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES ('CAT0000001','Kỹ năng sống'),('CAT0000003','Lịch sử - Sách khoa học'),('CAT0000002','Văn học');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detailfinereceipt`
--

DROP TABLE IF EXISTS `detailfinereceipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detailfinereceipt` (
  `DetailFineID` int NOT NULL AUTO_INCREMENT,
  `BorrowDetailID` int NOT NULL,
  `StaffID` char(10) DEFAULT NULL,
  `Reason` varchar(255) NOT NULL,
  `Amount` decimal(10,2) NOT NULL,
  `IssuedDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `PaidDate` datetime DEFAULT NULL,
  `Status` varchar(50) DEFAULT 'Pending',
  PRIMARY KEY (`DetailFineID`),
  UNIQUE KEY `BorrowDetailID` (`BorrowDetailID`),
  KEY `FK_DetailFine_Staff` (`StaffID`),
  CONSTRAINT `FK_DetailFine_BorrowDetail` FOREIGN KEY (`BorrowDetailID`) REFERENCES `borrowdetail` (`BorrowDetailID`),
  CONSTRAINT `FK_DetailFine_Staff` FOREIGN KEY (`StaffID`) REFERENCES `staff` (`StaffID`),
  CONSTRAINT `detailfinereceipt_chk_1` CHECK ((`Status` in (_utf8mb4'Pending',_utf8mb4'Paid',_utf8mb4'Void')))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detailfinereceipt`
--

LOCK TABLES `detailfinereceipt` WRITE;
/*!40000 ALTER TABLE `detailfinereceipt` DISABLE KEYS */;
INSERT INTO `detailfinereceipt` VALUES (1,2,NULL,'Trả sách trễ hạn 5 ngày',25000.00,'2026-01-20 10:00:00',NULL,'Pending'),(2,3,NULL,'Sách bị hỏng (rách bìa, ố vàng)',50000.00,'2026-02-10 11:00:00',NULL,'Pending'),(3,4,NULL,'Mất sách - đền bù theo giá bìa',120000.00,'2026-02-12 09:30:00',NULL,'Pending'),(4,5,'NV001','Trả sách trễ hạn 10 ngày',50000.00,'2026-04-25 15:00:00','2026-04-26 09:00:00','Paid');
/*!40000 ALTER TABLE `detailfinereceipt` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_insert_finereceipt` AFTER INSERT ON `detailfinereceipt` FOR EACH ROW BEGIN
    DECLARE reader_id INT;

    -- Lấy readerID từ BorrowDetail -> BorrowRecord
    SELECT br.readerID INTO reader_id
    FROM BorrowDetail bd
    JOIN BorrowRecord br ON bd.borrowID = br.borrowID
    WHERE bd.borrowDetailID = NEW.borrowDetailID;

    -- Nếu có bất kỳ fine nào chưa trả (Status = Pending) của reader này, khóa tài khoản
    IF EXISTS (
        SELECT 1
        FROM DetailFineReceipt fr
        JOIN BorrowDetail bd ON fr.borrowDetailID = bd.borrowDetailID
        JOIN BorrowRecord br ON bd.borrowID = br.borrowID
        WHERE br.readerID = reader_id
          AND fr.Status = 'Pending'
    ) THEN
        UPDATE Reader
        SET Status = 'Suspended'
        WHERE ReaderID = reader_id;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_update_finereceipt_paid` AFTER UPDATE ON `detailfinereceipt` FOR EACH ROW BEGIN
    DECLARE reader_id INT;
    
    -- Chỉ xử lý khi Status vừa chuyển từ Pending sang Paid
    IF OLD.Status = 'Pending' AND NEW.Status = 'Paid' THEN
        -- Lấy readerID
        SELECT br.readerID INTO reader_id
        FROM BorrowDetail bd
        JOIN BorrowRecord br ON bd.borrowID = br.borrowID
        WHERE bd.borrowDetailID = NEW.borrowDetailID;

        -- Kiểm tra xem reader còn fine pending nào khác không
        IF NOT EXISTS (
            SELECT 1
            FROM DetailFineReceipt fr
            JOIN BorrowDetail bd ON fr.borrowDetailID = bd.borrowDetailID
            JOIN BorrowRecord br ON bd.borrowID = br.borrowID
            WHERE br.readerID = reader_id
              AND fr.Status = 'Pending'
        ) THEN
            -- Nếu không còn fine nào, mở khoá tài khoản
            UPDATE Reader
            SET Status = 'Active'
            WHERE ReaderID = reader_id;
        END IF;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `finereceipt`
--

DROP TABLE IF EXISTS `finereceipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `finereceipt` (
  `FineID` char(10) NOT NULL,
  `BorrowID` int NOT NULL,
  `Note` varchar(255) DEFAULT NULL,
  `Amount` decimal(12,2) NOT NULL DEFAULT '0.00',
  `PaymentStatus` varchar(50) DEFAULT 'Unpaid',
  PRIMARY KEY (`FineID`),
  KEY `FK_FineReceipt_BorrowRecord` (`BorrowID`),
  CONSTRAINT `FK_FineReceipt_BorrowRecord` FOREIGN KEY (`BorrowID`) REFERENCES `borrowrecord` (`BorrowID`),
  CONSTRAINT `finereceipt_chk_1` CHECK ((`PaymentStatus` in (_utf8mb4'Unpaid',_utf8mb4'Paid')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `finereceipt`
--

LOCK TABLES `finereceipt` WRITE;
/*!40000 ALTER TABLE `finereceipt` DISABLE KEYS */;
INSERT INTO `finereceipt` VALUES ('FR00000001',1,'Phạt trễ hạn trả sách 3 ngày',15000.00,'Paid'),('FR00000002',2,'Phạt làm hỏng trang sách 12-15',50000.00,'Unpaid'),('FR00000003',3,'Phạt trễ hạn trả sách 7 ngày',35000.00,'Unpaid');
/*!40000 ALTER TABLE `finereceipt` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publisher`
--

DROP TABLE IF EXISTS `publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publisher` (
  `PublisherID` char(10) NOT NULL,
  `Name` varchar(100) NOT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `Phone` char(10) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Website` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`PublisherID`),
  UNIQUE KEY `Name` (`Name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publisher`
--

LOCK TABLES `publisher` WRITE;
/*!40000 ALTER TABLE `publisher` DISABLE KEYS */;
INSERT INTO `publisher` VALUES ('PUB0000001','NXB Trẻ','161 Lý Chính Thắng, P. Võ Thị Sáu, Q.3, TP.HCM','0283931629','nxbtre@nxbtre.com.vn','https://www.nxbtre.com.vn'),('PUB0000002','NXB Nhã Nam','59 Đỗ Quang, Trung Hoà, Cầu Giấy, Hà Nội','0243514686','bookstore@nhanam.vn','https://nhanam.vn'),('PUB0000003','NXB Kim Đồng','55 Quang Trung, Nguyễn Du, Hai Bà Trưng, Hà Nội','0239434730','info@nxbkimdong.com.vn','https://nxbkimdong.com.vn');
/*!40000 ALTER TABLE `publisher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reader`
--

DROP TABLE IF EXISTS `reader`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reader` (
  `ReaderID` char(10) NOT NULL,
  `FullName` varchar(50) NOT NULL,
  `DOB` date DEFAULT NULL,
  `Phone` char(10) DEFAULT NULL,
  `Gender` varchar(10) NOT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `CCCD` char(12) DEFAULT NULL,
  `StartDate` date NOT NULL,
  `ExpiryDate` date NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Status` varchar(50) NOT NULL DEFAULT 'Active',
  PRIMARY KEY (`ReaderID`),
  UNIQUE KEY `Username` (`Username`),
  UNIQUE KEY `Phone` (`Phone`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `CCCD` (`CCCD`),
  CONSTRAINT `CHK_Reader_Dates` CHECK ((`ExpiryDate` > `StartDate`)),
  CONSTRAINT `CHK_Reader_Status` CHECK ((`Status` in (_utf8mb4'Active',_utf8mb4'Locked',_utf8mb4'Suspended')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reader`
--

LOCK TABLES `reader` WRITE;
/*!40000 ALTER TABLE `reader` DISABLE KEYS */;
INSERT INTO `reader` VALUES ('DG001','Nguyễn Văn An','2002-03-22','0965432109','Nam','an.nguyen@gmail.com','Q. Bình Thạnh, TP.HCM','079202098765','2024-01-10','2027-01-10','annguyen','123456','Active'),('DG002','Trần Thị Bích','2000-09-08','0954321098','Nữ','bich.tran@gmail.com','Q. Tân Bình, TP.HCM','079300067890','2024-01-10','2027-01-10','bichtran','123456','Active'),('R-7DD74FCE','John',NULL,NULL,'Other','john@gmail.com',NULL,NULL,'2026-09-13','2027-09-13','student01','$2a$10$LkrYq3oH/AOZ79XuGeaMyeAolR3R10oxX/xLRskg.a3a6LOEtY85i','Active'),('RD00000001','Phạm Minh Tuấn','2001-05-15','0987654321','Nam','tuan.pm@gmail.com','Q.1, TP.HCM','079201012345','2024-01-01','2027-01-01','tuanpm','123456','Active'),('RD00000002','Lê Thị Thu Hà','1999-12-10','0976543210','Nữ','ha.le@gmail.com','Q.3, TP.HCM','079301054321','2024-01-01','2027-01-01','hale','123456','Active');
/*!40000 ALTER TABLE `reader` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservation`
--

DROP TABLE IF EXISTS `reservation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservation` (
  `ReservationID` char(10) NOT NULL,
  `ReaderID` char(10) NOT NULL,
  `CopyID` char(10) NOT NULL,
  `ReservationDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `ExpiryDate` datetime NOT NULL,
  `Status` varchar(50) DEFAULT 'Pending',
  `QRCode` varchar(255) DEFAULT NULL,
  `Note` text,
  PRIMARY KEY (`ReservationID`),
  KEY `FK_Reservation_Reader` (`ReaderID`),
  KEY `FK_Reservation_Copy` (`CopyID`),
  CONSTRAINT `FK_Reservation_Copy` FOREIGN KEY (`CopyID`) REFERENCES `bookcopy` (`CopyID`),
  CONSTRAINT `FK_Reservation_Reader` FOREIGN KEY (`ReaderID`) REFERENCES `reader` (`ReaderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservation`
--

LOCK TABLES `reservation` WRITE;
/*!40000 ALTER TABLE `reservation` DISABLE KEYS */;
INSERT INTO `reservation` VALUES ('RS00000001','DG001','CP00000001','2024-01-14 09:30:00','2024-01-15 09:30:00','Pending','QR_RS00000001_DATA','Đặt giữ sách trước 2 ngày'),('RS00000002','DG002','CP00000002','2024-01-13 10:30:00','2024-01-14 10:30:00','Completed','QR_RS00000002_DATA','Đã nhận sách tại quầy');
/*!40000 ALTER TABLE `reservation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `StaffID` char(10) NOT NULL,
  `StaffName` varchar(50) NOT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Birthday_Staff` date DEFAULT NULL,
  `Numberphone` char(10) DEFAULT NULL,
  `Email` varchar(50) DEFAULT NULL,
  `Address` varchar(50) DEFAULT NULL,
  `CCCD` char(12) DEFAULT NULL,
  `Salary` decimal(12,2) DEFAULT NULL,
  `NameLogin_Staff` varchar(50) NOT NULL,
  `Password_Staff` varchar(255) NOT NULL,
  `Status` varchar(50) DEFAULT 'Active',
  `ManagedByAdminID` char(10) DEFAULT NULL,
  PRIMARY KEY (`StaffID`),
  UNIQUE KEY `NameLogin_Staff` (`NameLogin_Staff`),
  UNIQUE KEY `Email` (`Email`),
  UNIQUE KEY `CCCD` (`CCCD`),
  KEY `FK_Staff_Administrator` (`ManagedByAdminID`),
  CONSTRAINT `FK_Staff_Administrator` FOREIGN KEY (`ManagedByAdminID`) REFERENCES `administrator` (`AdminID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES ('NV001','Trần Văn Lâm','Nam','1995-04-12','0912345678',NULL,'Ho Chi Minh City','075207011378',10000000.00,'thuthu@library.vn','123456','Active','ADM001'),('NV002','Nguyễn Thị Mai','Nữ','1998-08-20','0923456789',NULL,'Ho Chi Minh City','079207018158',9500000.00,'mainguyen@library.vn','123456','Active','ADM001'),('NV003','Trương Bá Khang','Nam','1996-11-05','0934567890',NULL,'Ho Chi Minh City','079207043105',9800000.00,'khang.tb@library.vn','123456','Active','ADM001');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `v_borrowdetails`
--

DROP TABLE IF EXISTS `v_borrowdetails`;
/*!50001 DROP VIEW IF EXISTS `v_borrowdetails`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_borrowdetails` AS SELECT 
 1 AS `BorrowID`,
 1 AS `readerName`,
 1 AS `readerEmail`,
 1 AS `staffName`,
 1 AS `BorrowDate`,
 1 AS `BorrowDetailID`,
 1 AS `Title`,
 1 AS `Barcode`,
 1 AS `DueDate`,
 1 AS `ActualReturnDate`,
 1 AS `loanStatus`,
 1 AS `RenewalCount`,
 1 AS `ReturnCondition`,
 1 AS `fineID`,
 1 AS `fineAmount`,
 1 AS `fineStatus`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_overdueloans`
--

DROP TABLE IF EXISTS `v_overdueloans`;
/*!50001 DROP VIEW IF EXISTS `v_overdueloans`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_overdueloans` AS SELECT 
 1 AS `BorrowDetailID`,
 1 AS `readerName`,
 1 AS `readerEmail`,
 1 AS `Title`,
 1 AS `Barcode`,
 1 AS `DueDate`,
 1 AS `overdueDays`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `v_unpaidfines`
--

DROP TABLE IF EXISTS `v_unpaidfines`;
/*!50001 DROP VIEW IF EXISTS `v_unpaidfines`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `v_unpaidfines` AS SELECT 
 1 AS `fineID`,
 1 AS `readerName`,
 1 AS `readerEmail`,
 1 AS `Title`,
 1 AS `Barcode`,
 1 AS `Reason`,
 1 AS `Amount`,
 1 AS `IssuedDate`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `WishListID` char(10) NOT NULL,
  `ReaderID` char(10) NOT NULL,
  `BookID` char(10) NOT NULL,
  `AddedData` datetime DEFAULT CURRENT_TIMESTAMP,
  `Note` text,
  PRIMARY KEY (`WishListID`),
  KEY `FK_WishList_Reader` (`ReaderID`),
  KEY `FK_WishList_Book` (`BookID`),
  CONSTRAINT `FK_WishList_Book` FOREIGN KEY (`BookID`) REFERENCES `book` (`BookID`) ON DELETE CASCADE,
  CONSTRAINT `FK_WishList_Reader` FOREIGN KEY (`ReaderID`) REFERENCES `reader` (`ReaderID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES ('WL00000001','RD00000001','BK00000002','2026-08-15 09:30:00','Muốn đọc bản tiếng Việt mới tái bản'),('WL00000002','RD00000002','BK00000005','2026-08-20 14:15:00','Sách đang hết lượt mượn, chờ thông báo'),('WL00000003','RD00000001','BK00000010','2026-09-01 10:05:00','Cần mượn làm tài liệu tham khảo bài luận');
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'library_management_system'
--

--
-- Dumping routines for database 'library_management_system'
--

--
-- Final view structure for view `v_borrowdetails`
--

/*!50001 DROP VIEW IF EXISTS `v_borrowdetails`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_borrowdetails` AS select `br`.`BorrowID` AS `BorrowID`,`r`.`FullName` AS `readerName`,`r`.`Email` AS `readerEmail`,`s`.`StaffName` AS `staffName`,`br`.`BorrowDate` AS `BorrowDate`,`bd`.`BorrowDetailID` AS `BorrowDetailID`,`bk`.`Title` AS `Title`,`bc`.`Barcode` AS `Barcode`,`bd`.`DueDate` AS `DueDate`,`bd`.`ActualReturnDate` AS `ActualReturnDate`,`bd`.`Status` AS `loanStatus`,`bd`.`RenewalCount` AS `RenewalCount`,`bd`.`ReturnCondition` AS `ReturnCondition`,`dfr`.`DetailFineID` AS `fineID`,`dfr`.`Amount` AS `fineAmount`,`dfr`.`Status` AS `fineStatus` from ((((((`borrowrecord` `br` join `reader` `r` on((`br`.`ReaderID` = `r`.`ReaderID`))) join `staff` `s` on((`br`.`StaffID` = `s`.`StaffID`))) join `borrowdetail` `bd` on((`br`.`BorrowID` = `bd`.`BorrowID`))) join `bookcopy` `bc` on((`bd`.`CopyID` = `bc`.`CopyID`))) join `book` `bk` on((`bc`.`BookID` = `bk`.`BookID`))) left join `detailfinereceipt` `dfr` on((`bd`.`BorrowDetailID` = `dfr`.`BorrowDetailID`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_overdueloans`
--

/*!50001 DROP VIEW IF EXISTS `v_overdueloans`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_overdueloans` AS select `bd`.`BorrowDetailID` AS `BorrowDetailID`,`r`.`FullName` AS `readerName`,`r`.`Email` AS `readerEmail`,`bk`.`Title` AS `Title`,`bc`.`Barcode` AS `Barcode`,`bd`.`DueDate` AS `DueDate`,(to_days(curdate()) - to_days(`bd`.`DueDate`)) AS `overdueDays` from ((((`borrowdetail` `bd` join `borrowrecord` `br` on((`bd`.`BorrowID` = `br`.`BorrowID`))) join `reader` `r` on((`br`.`ReaderID` = `r`.`ReaderID`))) join `bookcopy` `bc` on((`bd`.`CopyID` = `bc`.`CopyID`))) join `book` `bk` on((`bc`.`BookID` = `bk`.`BookID`))) where ((`bd`.`ActualReturnDate` is null) and (`bd`.`DueDate` < curdate())) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `v_unpaidfines`
--

/*!50001 DROP VIEW IF EXISTS `v_unpaidfines`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `v_unpaidfines` AS select `dfr`.`DetailFineID` AS `fineID`,`r`.`FullName` AS `readerName`,`r`.`Email` AS `readerEmail`,`bk`.`Title` AS `Title`,`bc`.`Barcode` AS `Barcode`,`dfr`.`Reason` AS `Reason`,`dfr`.`Amount` AS `Amount`,`dfr`.`IssuedDate` AS `IssuedDate` from (((((`detailfinereceipt` `dfr` join `borrowdetail` `bd` on((`dfr`.`BorrowDetailID` = `bd`.`BorrowDetailID`))) join `borrowrecord` `br` on((`bd`.`BorrowID` = `br`.`BorrowID`))) join `reader` `r` on((`br`.`ReaderID` = `r`.`ReaderID`))) join `bookcopy` `bc` on((`bd`.`CopyID` = `bc`.`CopyID`))) join `book` `bk` on((`bc`.`BookID` = `bk`.`BookID`))) where (`dfr`.`Status` = 'Pending') */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-09-13  9:43:34
