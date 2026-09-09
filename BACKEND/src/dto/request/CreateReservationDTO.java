package dto.request;

public class CreateReservationDTO {
    private String readerId;
    private String copyId;
    private String note;

    public CreateReservationDTO() {}

    public String getReaderId() { return readerId; }
    public void setReaderId(String readerId) { this.readerId = readerId; }

    public String getCopyId() { return copyId; }
    public void setCopyId(String copyId) { this.copyId = copyId; }

    public String getNote() { return note; }
    public void setNote(String note) { this.note = note; }
}
