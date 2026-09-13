package com.library.service;

import com.library.dto.request.AddToWishlistRequest;
import com.library.dto.request.CreateReservationRequest;
import com.library.dto.response.ReservationResponse;
import com.library.dto.response.WishlistResponse;
import com.library.entity.BookCopy;
import com.library.entity.Reader;
import com.library.entity.Reservation;
import com.library.entity.WishList;
import com.library.exception.InvalidOperationException;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.BookCopyRepository;
import com.library.repository.BookRepository;
import com.library.repository.ReaderRepository;
import com.library.repository.ReservationRepository;
import com.library.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final ReaderRepository readerRepository;
    private final BookCopyRepository bookCopyRepository;
    private final BookRepository bookRepository;
    private final WishlistRepository wishlistRepository;

    @Transactional
    public ReservationResponse createReservation(CreateReservationRequest request) {
        Reader reader = readerRepository.findById(request.getReaderId())
            .orElseThrow(() -> new ResourceNotFoundException("Reader not found: " + request.getReaderId()));
        BookCopy copy = bookCopyRepository.findById(request.getCopyId())
            .orElseThrow(() -> new ResourceNotFoundException("Book copy not found: " + request.getCopyId()));
        if (!"Available".equalsIgnoreCase(copy.getStatus())) {
            throw new InvalidOperationException("This book copy is not available for reservation");
        }
        String reservationId = "R" + UUID.randomUUID().toString().replace("-", "").substring(0, 9);
        reservationRepository.save(Reservation.builder()
            .reservationId(reservationId)
            .reader(reader)
            .bookCopy(copy)
            .reservationDate(LocalDateTime.now())
            .expiryDate(LocalDateTime.now().plusDays(3))
            .status("PENDING")
            .build());
        return ReservationResponse.builder()
            .reservationId(reservationId)
                .readerId(request.getReaderId())
                .copyId(request.getCopyId())
                .status("PENDING")
                .build();
    }

    @Transactional(readOnly = true)
    public Page<ReservationResponse> getMyReservations(Pageable pageable) {
        Reader reader = currentReader();
        List<ReservationResponse> responses = reservationRepository
            .findByReader_ReaderIdAndStatus(reader.getReaderId(), "PENDING")
            .stream()
            .map(reservation -> ReservationResponse.builder()
                .reservationId(reservation.getReservationId())
                .readerId(reader.getReaderId())
                .copyId(reservation.getBookCopy().getCopyId())
                .status(reservation.getStatus())
                .build())
            .toList();
        return new PageImpl<>(responses, pageable, responses.size());
    }

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

    @Transactional
    public WishlistResponse addToWishlist(AddToWishlistRequest request) {
        Reader reader = readerRepository.findById(request.getReaderId())
            .orElseThrow(() -> new ResourceNotFoundException("Reader not found: " + request.getReaderId()));
        var book = bookRepository.findById(request.getBookId())
            .orElseThrow(() -> new ResourceNotFoundException("Book not found: " + request.getBookId()));
        String wishlistId = "W" + UUID.randomUUID().toString().replace("-", "").substring(0, 9);
        wishlistRepository.save(WishList.builder()
            .wishListId(wishlistId)
            .reader(reader)
            .book(book)
            .addedData(LocalDateTime.now())
            .build());
        return WishlistResponse.builder()
            .wishlistId(wishlistId)
                .readerId(request.getReaderId())
                .bookId(request.getBookId())
                .build();
    }

    @Transactional
    public void removeFromWishlist(String bookId) {
        Reader reader = currentReader();
        wishlistRepository.findByReader_ReaderId(reader.getReaderId()).stream()
            .filter(item -> item.getBook().getBookId().equals(bookId))
            .findFirst()
            .ifPresent(wishlistRepository::delete);
    }

    @Transactional(readOnly = true)
    public Page<WishlistResponse> getMyWishlist(Pageable pageable) {
        Reader reader = currentReader();
        List<WishlistResponse> responses = wishlistRepository.findByReader_ReaderId(reader.getReaderId())
            .stream()
            .map(item -> WishlistResponse.builder()
                .wishlistId(item.getWishListId())
                .readerId(reader.getReaderId())
                .bookId(item.getBook().getBookId())
                .build())
            .toList();
        return new PageImpl<>(responses, pageable, responses.size());
    }

        private Reader currentReader() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return readerRepository.findByUsername(username)
            .orElseThrow(() -> new ResourceNotFoundException("Reader account not found"));
        }
}