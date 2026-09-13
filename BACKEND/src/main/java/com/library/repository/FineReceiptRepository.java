package com.library.repository;

import com.library.entity.BorrowRecord;
import com.library.entity.FineReceipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FineReceiptRepository extends JpaRepository<FineReceipt, String> {
    
    Optional<FineReceipt> findByBorrowRecord(BorrowRecord borrowRecord);

    List<FineReceipt> findByPaymentStatus(String paymentStatus);
}