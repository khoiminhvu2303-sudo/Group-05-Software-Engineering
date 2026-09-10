package com.library.scheduler;

import com.library.async.NotificationProcessor;
import com.library.entity.BorrowDetail;
import com.library.repository.BorrowDetailRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class OverdueBookScheduler {

    private final BorrowDetailRepository borrowDetailRepository;
    private final NotificationProcessor notificationProcessor;

    // Runs every day at 00:00 AM
    @Scheduled(cron = "0 0 0 * * ?")
    public void scanOverdueBooks() {
        log.info("Starting OverdueBookScheduler...");
        List<BorrowDetail> unreturnedList = borrowDetailRepository.findByBookStatus("BORROWED");

        for (BorrowDetail detail : unreturnedList) {
            LocalDate dueDate = detail.getBorrowRecord().getDueDate();
            if (LocalDate.now().isAfter(dueDate)) {
                long daysOverdue = ChronoUnit.DAYS.between(dueDate, LocalDate.now());
                
                notificationProcessor.processOverdueNotification(
                    detail.getBorrowRecord().getReader().getEmail(),
                    detail.getBorrowRecord().getReader().getPhone(),
                    detail.getBookCopy().getBook().getTitle(),
                    daysOverdue
                );
            }
        }
    }
}
