package com.library.controller;

import com.library.dto.request.AddToWishlistRequest;
import com.library.dto.request.CreateReservationRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.ReservationResponse;
import com.library.dto.response.WishlistResponse;
import com.library.service.ReservationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class ReservationController {

    private final ReservationService reservationService;

    // Reservation endpoints
    @PostMapping("/reservations")
    @PreAuthorize("hasRole('READER')")
    public ResponseEntity<ApiResponse<ReservationResponse>> createReservation(
            @Valid @RequestBody CreateReservationRequest request) {
        ReservationResponse response = reservationService.createReservation(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Book reserved"));
    }

    @GetMapping("/reservations/my")
    @PreAuthorize("hasRole('READER')")
    public ResponseEntity<ApiResponse<Page<ReservationResponse>>> getMyReservations(Pageable pageable) {
        Page<ReservationResponse> page = reservationService.getMyReservations(pageable);
        return ResponseEntity.ok(ApiResponse.success(page));
    }

    @DeleteMapping("/reservations/{id}")
    @PreAuthorize("hasRole('READER')")
    public ResponseEntity<ApiResponse<Void>> cancelReservation(@PathVariable String id) {
        reservationService.cancelReservation(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Reservation cancelled"));
    }

    // Wishlist endpoints
    @PostMapping("/wishlist")
    @PreAuthorize("hasRole('READER')")
    public ResponseEntity<ApiResponse<WishlistResponse>> addToWishlist(@Valid @RequestBody AddToWishlistRequest request) {
        WishlistResponse response = reservationService.addToWishlist(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Added to wishlist"));
    }

    @DeleteMapping("/wishlist/{bookId}")
    @PreAuthorize("hasRole('READER')")
    public ResponseEntity<ApiResponse<Void>> removeFromWishlist(@PathVariable String bookId) {
        reservationService.removeFromWishlist(bookId);
        return ResponseEntity.ok(ApiResponse.success(null, "Removed from wishlist"));
    }

    @GetMapping("/wishlist/my")
    @PreAuthorize("hasRole('READER')")
    public ResponseEntity<ApiResponse<Page<WishlistResponse>>> getMyWishlist(Pageable pageable) {
        Page<WishlistResponse> page = reservationService.getMyWishlist(pageable);
        return ResponseEntity.ok(ApiResponse.success(page));
    }
}
