package com.library.util;

public class BarcodeGenerator {

    public static String generateBookBarcode(Long bookId, Long copyId) {
        return String.format("BK-%06d-%04d", bookId, copyId);
    }

    public static String generateReaderBarcode(Long readerId) {
        return String.format("RD-%08d", readerId);
    }
}