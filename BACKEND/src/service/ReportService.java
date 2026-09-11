package com.library.service;

import com.library.repository.BorrowRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final BorrowRecordRepository borrowRecordRepository;

    @Transactional(readOnly = true)
    public long getTotalBorrowsCount(LocalDate startDate, LocalDate endDate) {
        return borrowRecordRepository.countByDateBorrowBetween(startDate, endDate);
    }
}
