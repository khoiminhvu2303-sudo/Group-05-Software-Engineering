package com.library.controller;

import com.library.dto.request.ApproveReaderRequest;
import com.library.dto.request.ChangeReaderStatusRequest;
import com.library.dto.request.RegisterReaderRequest;
import com.library.dto.request.UpdateReaderRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.BorrowRecordResponse;
import com.library.dto.response.ReaderResponse;
import com.library.dto.response.VerifyReaderResponse;
import com.library.service.ReaderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/readers")
@RequiredArgsConstructor
public class ReaderController {

    private final ReaderService readerService;

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<ReaderResponse>> register(@Valid @RequestBody RegisterReaderRequest request) {
        ReaderResponse response = readerService.register(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Registration successful, pending approval"));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ResponseEntity<ApiResponse<Page<ReaderResponse>>> getAllReaders(
            @RequestParam(required = false) String status,
            Pageable pageable) {
        Page<ReaderResponse> page = readerService.getAllReaders(status, pageable);
        return ResponseEntity.ok(ApiResponse.success(page));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('READER', 'STAFF', 'ADMIN')")
    public ResponseEntity<ApiResponse<ReaderResponse>> getReaderById(@PathVariable String id) {
        ReaderResponse response = readerService.getReaderById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('READER', 'STAFF', 'ADMIN')")
    public ResponseEntity<ApiResponse<ReaderResponse>> updateReader(
            @PathVariable String id,
            @Valid @RequestBody UpdateReaderRequest request) {
        ReaderResponse response = readerService.updateReader(id, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Reader updated"));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ResponseEntity<ApiResponse<ReaderResponse>> changeStatus(
            @PathVariable String id,
            @Valid @RequestBody ChangeReaderStatusRequest request) {
        ReaderResponse response = readerService.changeStatus(id, request.getStatus());
        return ResponseEntity.ok(ApiResponse.success(response, "Status updated"));
    }

    @GetMapping("/requests")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ResponseEntity<ApiResponse<Page<ReaderResponse>>> getPendingRequests(Pageable pageable) {
        Page<ReaderResponse> page = readerService.getPendingRequests(pageable);
        return ResponseEntity.ok(ApiResponse.success(page));
    }

    @PostMapping("/{id}/approve")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ResponseEntity<ApiResponse<ReaderResponse>> approveReader(
            @PathVariable String id,
            @Valid @RequestBody ApproveReaderRequest request) {
        ReaderResponse response = readerService.approveReader(id, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Reader approved and QR code generated"));
    }

    @GetMapping("/{id}/verify")
    @PreAuthorize("hasAnyRole('READER', 'STAFF', 'ADMIN')")
    public ResponseEntity<ApiResponse<VerifyReaderResponse>> verifyCard(@PathVariable String id) {
        VerifyReaderResponse response = readerService.verifyCard(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/{id}/borrow-history")
    @PreAuthorize("hasAnyRole('READER', 'STAFF', 'ADMIN')")
    public ResponseEntity<ApiResponse<Page<BorrowRecordResponse>>> getBorrowHistory(
            @PathVariable String id,
            Pageable pageable) {
        Page<BorrowRecordResponse> page = readerService.getBorrowHistory(id, pageable);
        return ResponseEntity.ok(ApiResponse.success(page));
    }
}
