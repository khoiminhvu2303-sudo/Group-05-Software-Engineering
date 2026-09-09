package com.library.service.impl;

import com.library.repository.BorrowRecordRepository;
import com.library.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class ReportServiceImpl implements ReportService {

    private final BorrowRecordRepository borrowRecordRepository;

    @Override
    @Transactional(readOnly = true)
    public long getTotalBorrowsCount(LocalDate startDate, LocalDate endDate) {
        return borrowRecordRepository.countByDateBorrowBetween(startDate, endDate);
    }
}
