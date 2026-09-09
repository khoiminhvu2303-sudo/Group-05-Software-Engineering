package dto.request;

import java.math.BigDecimal;

public class CreateFineReceiptDTO {
    private String transactionId;
    private String readerId;
    private String describe;
    private BigDecimal amount;

    public CreateFineReceiptDTO() {}

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public String getReaderId() { return readerId; }
    public void setReaderId(String readerId) { this.readerId = readerId; }

    public String getDescribe() { return describe; }
    public void setDescribe(String describe) { this.describe = describe; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
}
