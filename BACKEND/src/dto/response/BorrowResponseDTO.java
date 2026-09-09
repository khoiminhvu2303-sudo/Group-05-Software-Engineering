package dto.response;

import java.time.LocalDate;

public class BorrowResponseDTO {
    private String transactionId;
    private String readerId;
    private String staffId;
    private LocalDate dateBorrow;
    private LocalDate dueDate;

    public BorrowResponseDTO() {}

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public String getReaderId() { return readerId; }
    public void setReaderId(String readerId) { this.readerId = readerId; }

    public String getStaffId() { return staffId; }
    public void setStaffId(String staffId) { this.staffId = staffId; }

    public LocalDate getDateBorrow() { return dateBorrow; }
    public void setDateBorrow(LocalDate dateBorrow) { this.dateBorrow = dateBorrow; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
}
