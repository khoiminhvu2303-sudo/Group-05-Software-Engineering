package dto.response;

public class StaffResponseDTO {
    private String staffId;
    private String staffName;
    private String email;
    private String numberphone;
    private String status;

    public StaffResponseDTO() {}

    public String getStaffId() { return staffId; }
    public void setStaffId(String staffId) { this.staffId = staffId; }

    public String getStaffName() { return staffName; }
    public void setStaffName(String staffName) { this.staffName = staffName; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getNumberphone() { return numberphone; }
    public void setNumberphone(String numberphone) { this.numberphone = numberphone; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
