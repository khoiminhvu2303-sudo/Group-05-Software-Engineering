package com.library.async;

import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class SmsSender {

    @Async("taskExecutor")
    public void sendSmsAsync(String phoneNumber, String message) {
        log.info("Sending async SMS to {}: {}", phoneNumber, message);
        try {
            Thread.sleep(1000);
            log.info("SMS sent successfully to {}", phoneNumber);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.error("Failed to send SMS to {}", phoneNumber, e);
        }
    }
}
