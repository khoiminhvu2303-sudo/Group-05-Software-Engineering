package com.library.controller;

import com.library.dto.request.CreateStaffRequest;
import com.library.dto.request.UpdateStaffRequest;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.StaffResponse;
import com.library.service.StaffService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/staff")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class StaffController {

    private final StaffService staffService;

    @GetMapping
    public ResponseEntity<ApiResponse<Page<StaffResponse>>> getAllStaff(Pageable pageable) {
        Page<StaffResponse> page = staffService.getAllStaff(pageable);
        return ResponseEntity.ok(ApiResponse.success(page));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<StaffResponse>> createStaff(@Valid @RequestBody CreateStaffRequest request) {
        StaffResponse response = staffService.createStaff(request);
        return ResponseEntity.ok(ApiResponse.success(response, "Staff created"));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<StaffResponse>> getStaffById(@PathVariable String id) {
        StaffResponse response = staffService.getStaffById(id);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<StaffResponse>> updateStaff(
            @PathVariable String id,
            @Valid @RequestBody UpdateStaffRequest request) {
        StaffResponse response = staffService.updateStaff(id, request);
        return ResponseEntity.ok(ApiResponse.success(response, "Staff updated"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteStaff(@PathVariable String id) {
        staffService.deleteStaff(id);
        return ResponseEntity.ok(ApiResponse.success(null, "Staff deleted"));
    }

    @PatchMapping("/{id}/role")
    public ResponseEntity<ApiResponse<StaffResponse>> assignRole(
            @PathVariable String id,
            @RequestParam String role) {
        StaffResponse response = staffService.assignRole(id, role);
        return ResponseEntity.ok(ApiResponse.success(response, "Role assigned"));
    }
}
