package com.library.repository;

import com.library.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, String> {

    List<Reservation> findByReader_ReaderIdAndStatus(String readerID, String status);
    List<Reservation> findByBookCopy_CopyIdAndStatus(String copyID, String status);

    boolean existsByReader_ReaderIdAndBookCopy_CopyIdAndStatus(String readerID, String copyID, String status);

    @Query("SELECT r FROM Reservation r WHERE r.expiryDate < :currentDate AND r.status = 'Active'")
    List<Reservation> findExpiredReservations(@Param("currentDate") LocalDateTime currentDate);

    @Query("SELECT r FROM Reservation r WHERE r.reader.readerId = :readerID AND r.status = 'Active'")
    List<Reservation> findActiveReservationsByReader(@Param("readerID") String readerID);
}
