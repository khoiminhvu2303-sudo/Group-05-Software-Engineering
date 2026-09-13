package com.library.util;

public class QRCodeGenerator {

    public static String generateQRCodePayload(String type, String referenceId) {
        return String.format("LIB_APP|TYPE:%s|ID:%s|TS:%d", type, referenceId, System.currentTimeMillis());
    }

    public static String generateFinePaymentQR(Long fineId, Double amount) {
        return String.format("PAYMENT_FINE_%d_AMOUNT_%.2f", fineId, amount);
    }
}