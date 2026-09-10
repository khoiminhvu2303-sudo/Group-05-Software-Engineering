package com.library.scheduler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class ReportGenerationScheduler {

    // Runs at 23:59 on the last day of every month
    @Scheduled(cron = "0 59 23 L * ?")
    public void generateMonthlyReport() {
        log.info("Starting automated monthly circulation report generation...");
        // Execution logic for compiling monthly borrow and fine statistics
    }
}
