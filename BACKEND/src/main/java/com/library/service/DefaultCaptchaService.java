package com.library.service;

import org.springframework.stereotype.Service;

@Service
public class DefaultCaptchaService implements CaptchaService {

    @Override
    public boolean verify(String captchaToken) {
        return captchaToken != null && !captchaToken.isBlank();
    }
}
