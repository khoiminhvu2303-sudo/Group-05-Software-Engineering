package com.library.repository;

import com.library.entity.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BorrowRecordRepository extends JpaRepository<BorrowRecord, String> {

    List<BorrowRecord> findByReader_ReaderId(String readerId);

    List<BorrowRecord> findByReader_ReaderIdAndStatus(String readerId, String status);

    @Query("SELECT br FROM BorrowRecord br WHERE br.reader.readerId = :readerId AND br.status = 'BORROWED'")
    List<BorrowRecord> findActiveBorrowsByReader(@Param("readerId") String readerId);

    @Query("SELECT br FROM BorrowRecord br WHERE br.dueDate < :currentDate AND br.status = 'BORROWED'")
    List<BorrowRecord> findOverdueBorrows(@Param("currentDate") LocalDate currentDate);

    @Query("SELECT COUNT(br) FROM BorrowRecord br WHERE br.reader.readerId = :readerId AND br.status = 'BORROWED'")
    long countActiveBorrowsByReader(@Param("readerId") String readerId);

    @Query("SELECT COUNT(br) FROM BorrowRecord br WHERE br.dateBorrow BETWEEN :startDate AND :endDate")
    long countByDateBorrowBetween(@Param("startDate") LocalDate startDate, @Param("endDate") LocalDate endDate);
}