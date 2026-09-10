package com.library.scheduler;

import com.library.entity.BorrowDetail;
import com.library.entity.FineReceipt;
import com.library.repository.BorrowDetailRepository;
import com.library.repository.FineReceiptRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class AutoFineCalculationScheduler {

    private static final BigDecimal DAILY_FINE_RATE = new BigDecimal("10000.00"); // 10,000 VND / day
    private final BorrowDetailRepository borrowDetailRepository;
    private final FineReceiptRepository fineReceiptRepository;

    // Runs every day at 01:00 AM
    @Scheduled(cron = "0 0 1 * * ?")
    public void calculateAutomatedFines() {
        log.info("Starting AutoFineCalculationScheduler...");
        List<BorrowDetail> unreturnedList = borrowDetailRepository.findByBookStatus("BORROWED");

        for (BorrowDetail detail : unreturnedList) {
            LocalDate dueDate = detail.getBorrowRecord().getDueDate();
            if (LocalDate.now().isAfter(dueDate)) {
                long overdueDays = ChronoUnit.DAYS.between(dueDate, LocalDate.now());
                BigDecimal calculatedAmount = DAILY_FINE_RATE.multiply(BigDecimal.valueOf(overdueDays));

                FineReceipt receipt = fineReceiptRepository.findByBorrowRecord(detail.getBorrowRecord())
                        .orElseGet(() -> {
                            FineReceipt newReceipt = new FineReceipt();
                            newReceipt.setFineID("FINE-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
                            newReceipt.setBorrowRecord(detail.getBorrowRecord());
                            newReceipt.setPaymentStatus("UNPAID");
                            return newReceipt;
                        });

                receipt.setDescribe("Automated overdue fine calculation: " + overdueDays + " days");
                receipt.setAmount(calculatedAmount);
                fineReceiptRepository.save(receipt);
            }
        }
    }
}
