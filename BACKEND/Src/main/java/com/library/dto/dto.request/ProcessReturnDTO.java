package dto.request;

import java.time.LocalDate;

public class ProcessReturnDTO {
    private String borrowDetailId;
    private String transactionId;
    private String bookId;
    private String bookStatus;
    private String describe;
    private LocalDate actualReturnDate;

    public ProcessReturnDTO() {}

    public String getBorrowDetailId() { return borrowDetailId; }
    public void setBorrowDetailId(String borrowDetailId) { this.borrowDetailId = borrowDetailId; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public String getBookId() { return bookId; }
    public void setBookId(String bookId) { this.bookId = bookId; }

    public String getBookStatus() { return bookStatus; }
    public void setBookStatus(String bookStatus) { this.bookStatus = bookStatus; }

    public String getDescribe() { return describe; }
    public void setDescribe(String describe) { this.describe = describe; }

    public LocalDate getActualReturnDate() { return actualReturnDate; }
    public void setActualReturnDate(LocalDate actualReturnDate) { this.actualReturnDate = actualReturnDate; }
}
