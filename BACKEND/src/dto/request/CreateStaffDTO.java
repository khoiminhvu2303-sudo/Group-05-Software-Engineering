package dto.request;

import java.math.BigDecimal;
import java.time.LocalDate;

public class CreateStaffDTO {
    private String staffName;
    private String gender;
    private LocalDate birthdayStaff;
    private String numberphone;
    private String email;
    private String address;
    private String cccd;
    private BigDecimal salary;
    private String nameLoginStaff;
    private String passwordStaff;
    private String managedByAdminId;

    public CreateStaffDTO() {}

    public String getStaffName() { return staffName; }
    public void setStaffName(String staffName) { this.staffName = staffName; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public LocalDate getBirthdayStaff() { return birthdayStaff; }
    public void setBirthdayStaff(LocalDate birthdayStaff) { this.birthdayStaff = birthdayStaff; }

    public String getNumberphone() { return numberphone; }
    public void setNumberphone(String numberphone) { this.numberphone = numberphone; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCccd() { return cccd; }
    public void setCccd(String cccd) { this.cccd = cccd; }

    public BigDecimal getSalary() { return salary; }
    public void setSalary(BigDecimal salary) { this.salary = salary; }

    public String getNameLoginStaff() { return nameLoginStaff; }
    public void setNameLoginStaff(String nameLoginStaff) { this.nameLoginStaff = nameLoginStaff; }

    public String getPasswordStaff() { return passwordStaff; }
    public void setPasswordStaff(String passwordStaff) { this.passwordStaff = passwordStaff; }

    public String getManagedByAdminId() { return managedByAdminId; }
    public void setManagedByAdminId(String managedByAdminId) { this.managedByAdminId = managedByAdminId; }
}
