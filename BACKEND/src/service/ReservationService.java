package com.library.service.impl;

import com.library.entity.BookCopy;
import com.library.entity.Reader;
import com.library.entity.Reservation;
import com.library.exception.InvalidOperationException;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.BookCopyRepository;
import com.library.repository.ReaderRepository;
import com.library.repository.ReservationRepository;
import com.library.service.ReservationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReservationServiceImpl implements ReservationService {

    private final ReservationRepository reservationRepository;
    private final ReaderRepository readerRepository;
    private final BookCopyRepository bookCopyRepository;

    @Override
    @Transactional
    public void createReservation(String readerId, String copyId) {
        Reader reader = readerRepository.findById(readerId)
                .orElseThrow(() -> new ResourceNotFoundException("Reader not found: " + readerId));

        BookCopy copy = bookCopyRepository.findById(copyId)
                .orElseThrow(() -> new ResourceNotFoundException("Book copy not found: " + copyId));

        Reservation reservation = new Reservation();
        reservation.setReservationID("RES-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        reservation.setReader(reader);
        reservation.setBookCopy(copy);
        reservation.setReservationDate(LocalDateTime.now());
        reservation.setExpiryDate(LocalDateTime.now().plusDays(3));
        reservation.setStatus("PENDING");

        reservationRepository.save(reservation);
    }

    @Override
    @Transactional
    public void cancelReservation(String reservationId) {
        Reservation reservation = reservationRepository.findById(reservationId)
                .orElseThrow(() -> new ResourceNotFoundException("Reservation not found: " + reservationId));

        if (!"PENDING".equalsIgnoreCase(reservation.getStatus())) {
            throw new InvalidOperationException("Only pending reservations can be cancelled");
        }

        reservation.setStatus("CANCELLED");
        reservationRepository.save(reservation);
    }
}
