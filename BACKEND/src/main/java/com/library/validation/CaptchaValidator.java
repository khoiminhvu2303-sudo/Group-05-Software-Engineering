package com.library.validation;

import com.library.service.CaptchaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class CaptchaValidator {

    private final CaptchaService captchaService;

    
    public boolean isValid(String captchaToken) {
        if (captchaToken == null || captchaToken.isBlank()) {
            return false;
        }
        try {
            return captchaService.verify(captchaToken);
        } catch (Exception e) {
            log.error("Error verifying captcha", e);
            return false;
        }
    }

    public void requireValid(String captchaToken) {
        if (!isValid(captchaToken)) {
            throw new IllegalArgumentException("Captcha không hợp lệ hoặc đã hết hạn");
        }
    }
}
