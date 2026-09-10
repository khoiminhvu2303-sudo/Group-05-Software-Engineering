package com.library.scheduler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class BackupScheduler {

    // Runs every Sunday at 02:00 AM
    @Scheduled(cron = "0 0 2 * * SUN")
    public void performDatabaseBackup() {
        log.info("Starting automated database backup...");
        // Execution of database dump command via ProcessBuilder
    }
}
