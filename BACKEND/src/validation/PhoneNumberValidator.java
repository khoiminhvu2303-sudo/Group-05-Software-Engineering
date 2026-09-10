package com.library.validation;

import java.util.regex.Pattern;

public final class PhoneNumberValidator {


    private static final Pattern PHONE_PATTERN = Pattern.compile("^(0|\\+84)\\d{9,10}$");

    private PhoneNumberValidator() {}

    public static boolean isValid(String phone) {
        if (phone == null) return false;
        String normalized = phone.replaceAll("[\\s\\-.]", "");
        return PHONE_PATTERN.matcher(normalized).matches();
    }

    public static String normalize(String phone) {
        return phone == null ? null : phone.replaceAll("[\\s\\-.]", "");
    }
}
