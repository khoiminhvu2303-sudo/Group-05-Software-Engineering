package service;

import java.math.BigDecimal;

public class FineService {

    public String createFineReceipt(String transactionId, String describe, BigDecimal amount) {
        // TODO: Create new FineReceipt record
        return "FN00000001";
    }

    public boolean createFineDetail(String fineId, String readerId, BigDecimal amount, String describe) {
        // TODO: Create new FineReceiptDetail record
        return true;
    }
}
