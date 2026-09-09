package com.library.controller;

import com.library.dto.request.ProcessReturnRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.ReturnResponse;
import com.library.service.ReturnService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/returns")
@RequiredArgsConstructor
public class ReturnController {

    private final ReturnService returnService;

    @PostMapping
    @PreAuthorize("hasRole('STAFF')")
    public ResponseEntity<ApiResponse<ReturnResponse>> processReturn(@Valid @RequestBody ProcessReturnRequest request) {
        ReturnResponse response = returnService.processReturn(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Return processed"));
    }

    @GetMapping("/history/{readerId}")
    @PreAuthorize("hasAnyRole('READER', 'STAFF', 'ADMIN')")
    public ResponseEntity<ApiResponse<Page<ReturnResponse>>> getReturnHistory(
            @PathVariable String readerId,
            Pageable pageable) {
        Page<ReturnResponse> page = returnService.getReturnHistory(readerId, pageable);
        return ResponseEntity.ok(ApiResponse.success(page));
    }
}
