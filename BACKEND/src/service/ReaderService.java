package com.library.service.impl;

import com.library.dto.request.RegisterReaderDTO;
import com.library.dto.response.ReaderResponseDTO;
import com.library.entity.Reader;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.ReaderRepository;
import com.library.service.ReaderService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ReaderServiceImpl implements ReaderService {

    private final ReaderRepository readerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public ReaderResponseDTO registerReader(RegisterReaderDTO request) {
        Reader reader = new Reader();
        reader.setReaderID("R-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        reader.setFullName(request.getFullName());
        reader.setDob(request.getDob());
        reader.setPhone(request.getPhone());
        reader.setGender(request.getGender());
        reader.setEmail(request.getEmail());
        reader.setAddress(request.getAddress());
        reader.setCccd(request.getCccd());
        reader.setUsername(request.getUsername());
        reader.setPassword(passwordEncoder.encode(request.getPassword()));
        reader.setStartDate(LocalDate.now());
        reader.setExpiryDate(LocalDate.now().plusYears(1));
        reader.setStatus("ACTIVE");

        Reader savedReader = readerRepository.save(reader);
        return mapToResponse(savedReader);
    }

    @Override
    @Transactional(readOnly = true)
    public ReaderResponseDTO getReaderById(String readerId) {
        Reader reader = readerRepository.findById(readerId)
                .orElseThrow(() -> new ResourceNotFoundException("Reader not found with ID: " + readerId));
        return mapToResponse(reader);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReaderResponseDTO> getAllReaders() {
        return readerRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ReaderResponseDTO mapToResponse(Reader reader) {
        return ReaderResponseDTO.builder()
                .readerId(reader.getReaderID())
                .fullName(reader.getFullName())
                .dob(reader.getDob())
                .phone(reader.getPhone())
                .gender(reader.getGender())
                .email(reader.getEmail())
                .address(reader.getAddress())
                .cccd(reader.getCccd())
                .startDate(reader.getStartDate())
                .expiryDate(reader.getExpiryDate())
                .username(reader.getUsername())
                .status(reader.getStatus())
                .build();
    }
}
