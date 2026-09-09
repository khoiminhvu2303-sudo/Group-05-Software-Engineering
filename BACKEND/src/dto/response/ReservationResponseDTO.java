package dto.response;

import java.time.LocalDateTime;

public class ReservationResponseDTO {
    private String reservationId;
    private String readerId;
    private String copyId;
    private LocalDateTime reservationDate;
    private LocalDateTime expiryDate;
    private String status;
    private String qrCode;

    public ReservationResponseDTO() {}

    public String getReservationId() { return reservationId; }
    public void setReservationId(String reservationId) { this.reservationId = reservationId; }

    public String getReaderId() { return readerId; }
    public void setReaderId(String readerId) { this.readerId = readerId; }

    public String getCopyId() { return copyId; }
    public void setCopyId(String copyId) { this.copyId = copyId; }

    public LocalDateTime getReservationDate() { return reservationDate; }
    public void setReservationDate(LocalDateTime reservationDate) { this.reservationDate = reservationDate; }

    public LocalDateTime getExpiryDate() { return expiryDate; }
    public void setExpiryDate(LocalDateTime expiryDate) { this.expiryDate = expiryDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getQrCode() { return qrCode; }
    public void setQrCode(String qrCode) { this.qrCode = qrCode; }
}
