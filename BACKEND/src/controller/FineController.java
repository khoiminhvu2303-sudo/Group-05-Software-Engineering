package com.library.controller;

import com.library.dto.request.PayFineRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.FineResponse;
import com.library.service.FineService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/fines")
@RequiredArgsConstructor
public class FineController {

    private final FineService fineService;

    @PostMapping
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<ApiResponse<FineResponse>> createFine(@RequestBody @Valid FineResponse request) {
        // Giả định có DTO riêng để tạo phạt, nhưng ở đây tôi dùng FineResponse làm input
        // Bạn có thể tạo CreateFineRequest nếu cần
        FineResponse response = fineService.createFine(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Fine issued"));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ResponseEntity<ApiResponse<Page<FineResponse>>> getAllFines(
            @RequestParam(required = false) String status,
            Pageable pageable) {
        Page<FineResponse> page = fineService.getAllFines(status, pageable);
        return ResponseEntity.ok(ApiResponse.success(page));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('READER', 'STAFF', 'ADMIN')")
    public ResponseEntity<ApiResponse<FineResponse>> getFineById(@PathVariable String id) {
        FineResponse response = fineService.getFineById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PutMapping("/{id}/pay")
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<ApiResponse<FineResponse>> payFine(
            @PathVariable String id,
            @Valid @RequestBody PayFineRequest request) {
        FineResponse response = fineService.payFine(id, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Fine paid"));
    }

    @GetMapping("/my")
    @PreAuthorize("hasRole('READER')")
    public ResponseEntity<ApiResponse<Page<FineResponse>>> getMyFines(Pageable pageable) {
        Page<FineResponse> page = fineService.getMyFines(pageable);
        return ResponseEntity.ok(ApiResponse.success(page));
    }

    @PostMapping("/{id}/receipt")
    @PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
    public ResponseEntity<ApiResponse<byte[]>> printReceipt(@PathVariable String id) {
        byte[] pdf = fineService.printReceipt(id);
        return ResponseEntity.ok(ApiResponse.success(pdf, "Receipt generated"));
    }
}
