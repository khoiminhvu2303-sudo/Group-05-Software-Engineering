package com.library.service.impl;

import com.library.dto.request.CreateBorrowDTO;
import com.library.dto.response.BorrowResponseDTO;
import com.library.entity.*;
import com.library.exception.InvalidOperationException;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.*;
import com.library.service.BorrowService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BorrowServiceImpl implements BorrowService {

    private final BorrowRecordRepository borrowRecordRepository;
    private final BorrowDetailRepository borrowDetailRepository;
    private final ReaderRepository readerRepository;
    private final StaffRepository staffRepository;
    private final BookCopyRepository bookCopyRepository;

    @Override
    @Transactional
    public BorrowResponseDTO createBorrowRecord(CreateBorrowDTO request) {
        Reader reader = readerRepository.findById(request.getReaderId())
                .orElseThrow(() -> new ResourceNotFoundException("Reader not found: " + request.getReaderId()));

        if (!"ACTIVE".equalsIgnoreCase(reader.getStatus())) {
            throw new InvalidOperationException("Reader account is not active");
        }

        Staff staff = staffRepository.findById(request.getStaffId())
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found: " + request.getStaffId()));

        BorrowRecord record = new BorrowRecord();
        record.setTransactionID("TRX-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        record.setReader(reader);
        record.setStaff(staff);
        record.setDateBorrow(LocalDate.now());
        record.setDueDate(request.getDueDate());

        BorrowRecord savedRecord = borrowRecordRepository.save(record);

        List<BorrowDetail> details = new ArrayList<>();
        for (String copyId : request.getCopyIds()) {
            BookCopy copy = bookCopyRepository.findById(copyId)
                    .orElseThrow(() -> new ResourceNotFoundException("Book copy not found: " + copyId));

            if (!"AVAILABLE".equalsIgnoreCase(copy.getStatus())) {
                throw new InvalidOperationException("Book copy " + copyId + " is unavailable");
            }

            copy.setStatus("BORROWED");
            bookCopyRepository.save(copy);

            BorrowDetail detail = new BorrowDetail();
            detail.setBorrowDetailID("BD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
            detail.setBorrowRecord(savedRecord);
            detail.setBookCopy(copy);
            detail.setBookStatus("BORROWED");
            detail.setDateIssued(LocalDate.now());

            details.add(borrowDetailRepository.save(detail));
        }

        return mapToResponse(savedRecord, details);
    }

    @Override
    @Transactional(readOnly = true)
    public BorrowResponseDTO getBorrowRecord(String transactionId) {
        BorrowRecord record = borrowRecordRepository.findById(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found: " + transactionId));

        List<BorrowDetail> details = borrowDetailRepository.findByBorrowRecord(record);
        return mapToResponse(record, details);
    }

    private BorrowResponseDTO mapToResponse(BorrowRecord record, List<BorrowDetail> details) {
        List<BorrowResponseDTO.BorrowDetailDTO> detailDTOs = details.stream()
                .map(d -> BorrowResponseDTO.BorrowDetailDTO.builder()
                        .borrowDetailId(d.getBorrowDetailID())
                        .bookId(d.getBookCopy().getBook().getBookID())
                        .bookTitle(d.getBookCopy().getBook().getTitle())
                        .bookStatus(d.getBookStatus())
                        .dateIssued(d.getDateIssued())
                        .actualReturnDate(d.getActualReturnDate())
                        .build())
                .collect(Collectors.toList());

        return BorrowResponseDTO.builder()
                .transactionId(record.getTransactionID())
                .readerId(record.getReader().getReaderID())
                .readerName(record.getReader().getFullName())
                .staffId(record.getStaff().getStaffID())
                .staffName(record.getStaff().getStaffName())
                .dateBorrow(record.getDateBorrow())
                .dueDate(record.getDueDate())
                .borrowDetails(detailDTOs)
                .build();
    }
}
