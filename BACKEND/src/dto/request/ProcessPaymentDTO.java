package dto.request;

import java.math.BigDecimal;

public class ProcessPaymentDTO {
    private String fineId;
    private BigDecimal amount;
    private String paymentMethod;

    public ProcessPaymentDTO() {}

    public String getFineId() { return fineId; }
    public void setFineId(String fineId) { this.fineId = fineId; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
}
