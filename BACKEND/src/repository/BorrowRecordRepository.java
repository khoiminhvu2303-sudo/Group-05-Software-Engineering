package com.library.repository;

import com.library.entity.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, String> {

    List<BorrowRecord> findByReader_ReaderID(String readerID);
    List<BorrowRecord> findByReader_ReaderIDAndStatus(String readerID, String status);

    Optional<BorrowRecord> findByReader_ReaderIDAndBookCopy_CopyIDAndActualReturnDateIsNull(String readerID, String copyID);

    @Query("SELECT br FROM BorrowRecord br WHERE br.reader.readerID = :readerID AND br.actualReturnDate IS NULL")
    List<BorrowRecord> findActiveBorrowsByReader(@Param("readerID") String readerID);

    @Query("SELECT br FROM BorrowRecord br WHERE br.dueDate < :currentDate AND br.actualReturnDate IS NULL")
    List<BorrowRecord> findOverdueBorrows(@Param("currentDate") LocalDate currentDate);

    @Query("SELECT COUNT(br) FROM BorrowRecord br WHERE br.reader.readerID = :readerID AND br.actualReturnDate IS NULL")
    Long countActiveBorrowsByReader(@Param("readerID") String readerID);
}
