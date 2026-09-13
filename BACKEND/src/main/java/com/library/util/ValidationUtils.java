package com.library.util;

import java.util.Collection;

public class ValidationUtils {

    public static boolean isNullOrEmpty(String str) {
        return str == null || str.trim().isEmpty();
    }

    public static boolean isNullOrEmpty(Collection<?> collection) {
        return collection == null || collection.isEmpty();
    }

    public static boolean isPositive(Number number) {
        return number != null && number.doubleValue() > 0;
    }
}