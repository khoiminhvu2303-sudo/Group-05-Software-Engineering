package dto.response;

public class PaymentResponseDTO {
    private String paymentStatus;
    private String transactionNo;
    private String message;

    public PaymentResponseDTO() {}

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getTransactionNo() { return transactionNo; }
    public void setTransactionNo(String transactionNo) { this.transactionNo = transactionNo; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
