package service;

public class ReservationService {

    public String createReservation(String readerId, String copyId, String note) {
        // TODO: Save reservation info into Reservation table
        return "RS00000001";
    }

    public boolean cancelReservation(String reservationId) {
        // TODO: Update reservation status to Cancelled
        return true;
    }
}
