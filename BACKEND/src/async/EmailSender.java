package com.library.async;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class EmailSender {

    @Async("taskExecutor")
    public void sendEmailAsync(String toEmail, String subject, String content) {
        log.info("Sending async email to {} with subject: {}", toEmail, subject);
        try {
            // Simulates processing time for JavaMailSender
            Thread.sleep(2000);
            log.info("Email sent successfully to {}", toEmail);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            log.error("Failed to send email to {}", toEmail, e);
        }
    }
}
