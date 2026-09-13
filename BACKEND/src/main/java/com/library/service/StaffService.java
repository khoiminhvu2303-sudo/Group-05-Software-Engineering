package com.library.service;

import com.library.dto.request.CreateStaffRequest;
import com.library.dto.request.UpdateStaffRequest;
import com.library.dto.response.StaffResponse;
import com.library.entity.Staff;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.StaffRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StaffService {

    private final StaffRepository staffRepository;

    @Transactional(readOnly = true)
    public Page<StaffResponse> getAllStaff(Pageable pageable) {
        return staffRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    @Transactional(readOnly = true)
    public StaffResponse getStaffById(String staffId) {
        Staff staff = staffRepository.findById(staffId)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with ID: " + staffId));

        return mapToResponse(staff);
    }

    @Transactional
    public StaffResponse createStaff(CreateStaffRequest request) {
        Staff staff = new Staff();
        staff.setStaffId("STF-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        staff.setFullName(request.getStaffName());
        staff.setEmail(request.getEmail());
        staff.setPhoneNumber(request.getPhone());
        staff.setStatus(request.getStatus());
        staff.setRole(request.getRole());

        Staff savedStaff = staffRepository.save(staff);
        return mapToResponse(savedStaff);
    }

    @Transactional
    public StaffResponse updateStaff(String id, UpdateStaffRequest request) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with ID: " + id));

        if (request.getStaffName() != null) staff.setFullName(request.getStaffName());
        if (request.getEmail() != null) staff.setEmail(request.getEmail());
        if (request.getPhone() != null) staff.setPhoneNumber(request.getPhone());
        if (request.getStatus() != null) staff.setStatus(request.getStatus());
        if (request.getRole() != null) staff.setRole(request.getRole());

        Staff updatedStaff = staffRepository.save(staff);
        return mapToResponse(updatedStaff);
    }

    @Transactional
    public void deleteStaff(String id) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with ID: " + id));

        staffRepository.delete(staff);
    }

    @Transactional
    public StaffResponse assignRole(String id, String role) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found with ID: " + id));

        staff.setRole(role);
        Staff updatedStaff = staffRepository.save(staff);
        return mapToResponse(updatedStaff);
    }

    private StaffResponse mapToResponse(Staff staff) {
        return StaffResponse.builder()
                .staffId(staff.getStaffId())
                .staffName(staff.getFullName())
                .email(staff.getEmail())
                .phone(staff.getPhoneNumber())
                .role(staff.getRole())
                .status(staff.getStatus())
                .build();
    }
}