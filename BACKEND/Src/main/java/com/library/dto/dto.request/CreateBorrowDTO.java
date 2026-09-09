package dto.request;

import java.time.LocalDate;
import java.util.List;

public class CreateBorrowDTO {
    private String readerId;
    private String staffId;
    private LocalDate dueDate;
    private List<String> bookIds;

    public CreateBorrowDTO() {}

    public String getReaderId() { return readerId; }
    public void setReaderId(String readerId) { this.readerId = readerId; }

    public String getStaffId() { return staffId; }
    public void setStaffId(String staffId) { this.staffId = staffId; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public List<String> getBookIds() { return bookIds; }
    public void setBookIds(List<String> bookIds) { this.bookIds = bookIds; }
}
