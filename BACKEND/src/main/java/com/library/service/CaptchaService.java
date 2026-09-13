package com.library.service;

public interface CaptchaService {
    boolean verify(String captchaToken);
}