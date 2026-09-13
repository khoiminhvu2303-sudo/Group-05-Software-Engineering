package com.library.service;

import com.library.dto.request.CreateBorrowRequest;
import com.library.dto.request.RenewBookRequest;
import com.library.dto.response.BorrowRecordResponse;
import com.library.entity.*;
import com.library.exception.InvalidOperationException;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BorrowService {

    private final BorrowRecordRepository borrowRecordRepository;
    private final BorrowDetailRepository borrowDetailRepository;
    private final ReaderRepository readerRepository;
    private final StaffRepository staffRepository;
    private final BookCopyRepository bookCopyRepository;

    // 1. Tạo phiếu mượn (đã map về CreateBorrowRequest & BorrowRecordResponse)
    @Transactional
    public BorrowRecordResponse createBorrow(CreateBorrowRequest request) {
        Reader reader = readerRepository.findById(request.getReaderId())
                .orElseThrow(() -> new ResourceNotFoundException("Reader not found: " + request.getReaderId()));

        if (!"ACTIVE".equalsIgnoreCase(reader.getStatus())) {
            throw new InvalidOperationException("Reader account is not active");
        }

        Staff staff = staffRepository.findById(request.getStaffId())
                .orElseThrow(() -> new ResourceNotFoundException("Staff not found: " + request.getStaffId()));

        BorrowRecord record = new BorrowRecord();
        record.setTransactionId("TRX-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        record.setReader(reader);
        record.setStaff(staff);
        record.setDateBorrow(LocalDate.now());
        record.setDueDate(request.getDueDate());
        record.setStatus("BORROWED");

        BorrowRecord savedRecord = borrowRecordRepository.save(record);

        List<BorrowDetail> details = new ArrayList<>();
        if (request.getCopyIds() != null) {
            for (String copyId : request.getCopyIds()) {
                BookCopy copy = bookCopyRepository.findById(copyId)
                        .orElseThrow(() -> new ResourceNotFoundException("Book copy not found: " + copyId));

                if (!"AVAILABLE".equalsIgnoreCase(copy.getStatus())) {
                    throw new InvalidOperationException("Book copy " + copyId + " is unavailable");
                }

                copy.setStatus("BORROWED");
                bookCopyRepository.save(copy);

                BorrowDetail detail = new BorrowDetail();
                detail.setBorrowDetailId("BD-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
                detail.setBorrowRecord(savedRecord);
                detail.setBookCopy(copy);
                detail.setDueDate(request.getDueDate());
                detail.setStatus("BORROWED");
                detail.setDateIssued(LocalDate.now());

                details.add(borrowDetailRepository.save(detail));
            }
        }

        return mapToResponse(savedRecord);
    }

    // 2. Lấy danh sách phiếu mượn phân trang
    @Transactional(readOnly = true)
    public Page<BorrowRecordResponse> getAllBorrows(Pageable pageable) {
        Page<BorrowRecord> recordPage = borrowRecordRepository.findAll(pageable);
        List<BorrowRecordResponse> responses = recordPage.getContent().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responses, pageable, recordPage.getTotalElements());
    }

    // 3. Lấy phiếu mượn theo Long ID
    @Transactional(readOnly = true)
    public BorrowRecordResponse getBorrowById(String id) {
        String transactionId = id;
        BorrowRecord record = borrowRecordRepository.findById(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found: " + transactionId));

        return mapToResponse(record);
    }

    // 4. Gia hạn online
    @Transactional
    public BorrowRecordResponse renewBook(String id, RenewBookRequest request) {
        String transactionId = id;
        BorrowRecord record = borrowRecordRepository.findById(transactionId)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not found: " + transactionId));

        if (request.getNewDueDate() != null) {
            record.setDueDate(request.getNewDueDate());
            borrowRecordRepository.save(record);
        }

        return mapToResponse(record);
    }

    // 5. Gia hạn tại quầy
    @Transactional
    public BorrowRecordResponse renewBookOverCounter(String id, RenewBookRequest request) {
        return renewBook(id, request);
    }

    // Hàm phụ ánh xạ Entity sang BorrowRecordResponse
    private BorrowRecordResponse mapToResponse(BorrowRecord record) {
        return BorrowRecordResponse.builder()
                .transactionId(record.getTransactionId())
                .readerId(record.getReader() != null ? record.getReader().getReaderId() : null)
                .readerName(record.getReader() != null ? record.getReader().getFullName() : null)
                .staffId(record.getStaff() != null ? record.getStaff().getStaffId() : null)
                .staffName(record.getStaff() != null ? record.getStaff().getFullName() : null)
                .dateBorrow(record.getDateBorrow())
                .dueDate(record.getDueDate())
                .build();
    }
}