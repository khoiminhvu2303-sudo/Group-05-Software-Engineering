package com.library.repository;

import com.library.entity.BorrowDetail;
import com.library.entity.BorrowRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BorrowDetailRepository extends JpaRepository<BorrowDetail, String> {

    List<BorrowDetail> findByStatus(String status);

    List<BorrowDetail> findByBorrowRecord(BorrowRecord borrowRecord);
}