package com.library.controller;

import com.library.dto.request.CreateBorrowRequest;
import com.library.dto.request.RenewBookRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.BorrowRecordResponse;
import com.library.service.BorrowService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/borrows")
@RequiredArgsConstructor
public class BorrowController {

    private final BorrowService borrowService;

    @PostMapping
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<ApiResponse<BorrowRecordResponse>> createBorrow(@Valid @RequestBody CreateBorrowRequest request) {
        BorrowRecordResponse response = borrowService.createBorrow(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Borrow created"));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ResponseEntity<ApiResponse<Page<BorrowRecordResponse>>> getAllBorrows(Pageable pageable) {
        Page<BorrowRecordResponse> page = borrowService.getAllBorrows(pageable);
        return ResponseEntity.ok(ApiResponse.success(page));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('READER', 'STAFF', 'ADMIN')")
    public ResponseEntity<ApiResponse<BorrowRecordResponse>> getBorrowById(@PathVariable Long id) {
        BorrowRecordResponse response = borrowService.getBorrowById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PutMapping("/{id}/renew")
    @PreAuthorize("hasRole('READER')")
    public ResponseEntity<ApiResponse<BorrowRecordResponse>> renewOnline(
            @PathVariable Long id,
            @Valid @RequestBody RenewBookRequest request) {
        BorrowRecordResponse response = borrowService.renewBook(id, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Book renewed online"));
    }

    @PutMapping("/{id}/renew-counter")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<ApiResponse<BorrowRecordResponse>> renewOverCounter(
            @PathVariable Long id,
            @Valid @RequestBody RenewBookRequest request) {
        BorrowRecordResponse response = borrowService.renewBookOverCounter(id, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Book renewed over counter"));
    }
}
