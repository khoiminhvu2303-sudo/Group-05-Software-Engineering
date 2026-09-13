package com.library.controller;

import com.library.dto.request.CreateStaffDTO;
import com.library.dto.response.ApiResponse;
import com.library.dto.response.StaffResponseDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/admin")
@RequiredArgsConstructor
public class AdminController {

    @PostMapping("/staffs")
    public ResponseEntity<ApiResponse<StaffResponseDTO>> createStaff(@Valid @RequestBody CreateStaffDTO request) {
        // Gọi service tạo nhân viên ở đây khi tích hợp AdminService
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(null, "Staff created successfully"));
    }

    @GetMapping("/staffs")
    public ResponseEntity<ApiResponse<List<StaffResponseDTO>>> getAllStaffs() {
        return ResponseEntity.ok(ApiResponse.success(List.of(), "Fetched all staffs successfully"));
    }

    @DeleteMapping("/staffs/{staffId}")
    public ResponseEntity<ApiResponse<Void>> deleteStaff(@PathVariable String staffId) {
        return ResponseEntity.ok(ApiResponse.success(null, "Staff deleted successfully"));
    }
}
