package com.library.repository;

import com.library.entity.FineReceipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FineReceiptRepository extends JpaRepository<FineReceipt, String> {
    List<FineReceipt> findByPaymentStatus(String paymentStatus);
    List<FineReceipt> findByBorrowRecord_TransactionID(String transactionID);
}
