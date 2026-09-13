package com.library.service;

import com.library.dto.request.ApproveReaderRequest;
import com.library.dto.request.RegisterReaderRequest;
import com.library.dto.request.UpdateReaderRequest;
import com.library.dto.response.BorrowRecordResponse;
import com.library.dto.response.ReaderResponse;
import com.library.dto.response.VerifyReaderResponse;
import com.library.entity.Reader;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.ReaderRepository;
import com.library.repository.BorrowRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReaderService {

    private final ReaderRepository readerRepository;
    private final BorrowRecordRepository borrowRecordRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public ReaderResponse register(RegisterReaderRequest request) {
        Reader reader = new Reader();
        reader.setReaderId("R-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        reader.setFullName(request.getFullName());
        reader.setDob(request.getDob());
        reader.setPhone(request.getPhone());
        reader.setGender(request.getGender() == null ? "Other" : request.getGender());
        reader.setEmail(request.getEmail());
        reader.setAddress(request.getAddress());
        reader.setCardIssueDate(LocalDate.now());
        reader.setExpiryDate(LocalDate.now().plusYears(1));
        reader.setStatus("PENDING");
        reader.setUsername(request.getUsername());
        reader.setPassword(passwordEncoder.encode(request.getPassword()));

        Reader savedReader = readerRepository.save(reader);
        return mapToResponse(savedReader);
    }

    @Transactional(readOnly = true)
    public Page<ReaderResponse> getAllReaders(String status, Pageable pageable) {
        Page<Reader> page = readerRepository.findAll(pageable);
        List<ReaderResponse> responses = page.getContent().stream()
                .filter(r -> status == null || status.equalsIgnoreCase(r.getStatus()))
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responses, pageable, page.getTotalElements());
    }

    @Transactional(readOnly = true)
    public ReaderResponse getReaderById(String readerId) {
        Reader reader = readerRepository.findById(readerId)
                .orElseThrow(() -> new ResourceNotFoundException("Reader not found with ID: " + readerId));
        return mapToResponse(reader);
    }

    @Transactional
    public ReaderResponse updateReader(String id, UpdateReaderRequest request) {
        Reader reader = readerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reader not found with ID: " + id));

        if (request.getFullName() != null) reader.setFullName(request.getFullName());
        if (request.getPhone() != null) reader.setPhone(request.getPhone());
        if (request.getEmail() != null) reader.setEmail(request.getEmail());
        if (request.getAddress() != null) reader.setAddress(request.getAddress());

        Reader updated = readerRepository.save(reader);
        return mapToResponse(updated);
    }

    @Transactional
    public ReaderResponse changeStatus(String id, String status) {
        Reader reader = readerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reader not found with ID: " + id));

        reader.setStatus(status);
        Reader updated = readerRepository.save(reader);
        return mapToResponse(updated);
    }

    @Transactional(readOnly = true)
    public Page<ReaderResponse> getPendingRequests(Pageable pageable) {
        return getAllReaders("PENDING", pageable);
    }

    @Transactional
    public ReaderResponse approveReader(String id, ApproveReaderRequest request) {
        Reader reader = readerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reader not found with ID: " + id));

        reader.setStatus("ACTIVE");
        Reader updated = readerRepository.save(reader);
        return mapToResponse(updated);
    }

    @Transactional(readOnly = true)
    public VerifyReaderResponse verifyCard(String id) {
        Reader reader = readerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reader not found with ID: " + id));

        boolean isValid = "ACTIVE".equalsIgnoreCase(reader.getStatus()) 
                && (reader.getExpiryDate() == null || reader.getExpiryDate().isAfter(LocalDate.now()));

        return VerifyReaderResponse.builder()
                .valid(isValid)
                .readerId(reader.getReaderId())
                .fullName(reader.getFullName())
                .status(reader.getStatus())
                .build();
    }

    @Transactional(readOnly = true)
    public Page<BorrowRecordResponse> getBorrowHistory(String id, Pageable pageable) {
        readerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Reader not found with ID: " + id));
        Page<com.library.entity.BorrowRecord> records = borrowRecordRepository.findByReader_ReaderId(id)
            .stream()
            .collect(Collectors.collectingAndThen(Collectors.toList(), list -> new PageImpl<>(list, pageable, list.size())));
        List<BorrowRecordResponse> responses = records.getContent().stream()
            .map(record -> BorrowRecordResponse.builder()
                .transactionId(record.getTransactionId())
                .readerId(id)
                .readerName(record.getReader().getFullName())
                .staffId(record.getStaff() == null ? null : record.getStaff().getStaffId())
                .staffName(record.getStaff() == null ? null : record.getStaff().getFullName())
                .dateBorrow(record.getDateBorrow())
                .dueDate(record.getDueDate())
                .build())
            .collect(Collectors.toList());
        return new PageImpl<>(responses, pageable, records.getTotalElements());
    }

    private ReaderResponse mapToResponse(Reader reader) {
        return ReaderResponse.builder()
                .readerId(reader.getReaderId())
                .fullName(reader.getFullName())
                .dob(reader.getDob())
                .phone(reader.getPhone())
                .gender(reader.getGender())
                .email(reader.getEmail())
                .address(reader.getAddress())
                .cardIssueDate(reader.getCardIssueDate())
                .expiryDate(reader.getExpiryDate())
                .username(reader.getUsername())
                .status(reader.getStatus())
                .build();
    }
}