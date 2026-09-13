package com.library.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {

    public void sendNotification(String recipientEmail, String subject, String content) {
        // Notification sending logic
    }
}
