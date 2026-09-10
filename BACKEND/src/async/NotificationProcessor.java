package com.library.async;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class NotificationProcessor {

    private final EmailSender emailSender;
    private final SmsSender smsSender;

    @Async("taskExecutor")
    public void processOverdueNotification(String email, String phone, String bookTitle, long daysOverdue) {
        log.info("Processing overdue notification for book: {}", bookTitle);
        
        String subject = "Warning: Borrowed Book Overdue";
        String content = "Your borrowed book '" + bookTitle + "' is " + daysOverdue + " days overdue. Please return it as soon as possible.";

        emailSender.sendEmailAsync(email, subject, content);
        smsSender.sendSmsAsync(phone, "Library notice: Book " + bookTitle + " is overdue by " + daysOverdue + " days.");
    }
}
