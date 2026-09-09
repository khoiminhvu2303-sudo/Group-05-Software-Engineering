package com.library.service.impl;

import com.library.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    @Override
    public void sendNotification(String recipientEmail, String subject, String content) {
        // Notification logic (e.g., Spring JavaMailSender integration) goes here
    }
}
