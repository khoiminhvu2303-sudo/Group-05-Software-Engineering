package com.library.service.impl;

import com.library.dto.request.ProcessReturnDTO;
import com.library.entity.BookCopy;
import com.library.entity.BorrowDetail;
import com.library.entity.FineReceipt;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.BookCopyRepository;
import com.library.repository.BorrowDetailRepository;
import com.library.repository.FineReceiptRepository;
import com.library.service.ReturnService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReturnServiceImpl implements ReturnService {

    private static final BigDecimal DAILY_FINE_RATE = new BigDecimal("10000.00");

    private final BorrowDetailRepository borrowDetailRepository;
    private final BookCopyRepository bookCopyRepository;
    private final FineReceiptRepository fineReceiptRepository;

    @Override
    @Transactional
    public void processReturn(ProcessReturnDTO request) {
        BorrowDetail detail = borrowDetailRepository.findById(request.getBorrowDetailId())
                .orElseThrow(() -> new ResourceNotFoundException("Borrow detail not found: " + request.getBorrowDetailId()));

        detail.setActualReturnDate(LocalDate.now());
        detail.setBookStatus("RETURNED");
        borrowDetailRepository.save(detail);

        BookCopy copy = detail.getBookCopy();
        copy.setStatus("AVAILABLE");
        bookCopyRepository.save(copy);

        LocalDate dueDate = detail.getBorrowRecord().getDueDate();
        LocalDate returnDate = LocalDate.now();

        if (returnDate.isAfter(dueDate)) {
            long overdueDays = ChronoUnit.DAYS.between(dueDate, returnDate);
            BigDecimal fineAmount = DAILY_FINE_RATE.multiply(BigDecimal.valueOf(overdueDays));

            FineReceipt receipt = new FineReceipt();
            receipt.setFineID("FINE-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
            receipt.setBorrowRecord(detail.getBorrowRecord());
            receipt.setDescribe("Overdue fine for " + overdueDays + " days");
            receipt.setAmount(fineAmount);
            receipt.setPaymentStatus("UNPAID");

            fineReceiptRepository.save(receipt);
        }
    }
}
