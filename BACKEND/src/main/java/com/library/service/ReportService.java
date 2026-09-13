package com.library.service;

import com.library.dto.response.*;
import com.library.repository.BorrowRecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final BorrowRecordRepository borrowRecordRepository;

    @Transactional(readOnly = true)
    public long getTotalBorrowsCount(LocalDate startDate, LocalDate endDate) {
        return borrowRecordRepository.countByDateBorrowBetween(startDate, endDate);
    }

    @Transactional(readOnly = true)
    public DashboardResponse getDashboard() {
        return DashboardResponse.builder()
                .totalReaders(0)
                .totalBooks(0)
                .totalBorrows(0)
                .totalFines(0)
                .build();
    }

    @Transactional(readOnly = true)
    public BorrowStatsResponse getBorrowStats(String period, String startDate, String endDate) {
        return BorrowStatsResponse.builder()
                .totalBorrowed(0)
                .totalReturned(0)
                .averageBorrowDays(0.0)
                .build();
    }

    @Transactional(readOnly = true)
    public Page<OverdueBookResponse> getOverdueBooks(Pageable pageable) {
        return new PageImpl<>(Collections.emptyList(), pageable, 0);
    }

    @Transactional(readOnly = true)
    public FineRevenueResponse getFineRevenue(String startDate, String endDate) {
        return FineRevenueResponse.builder()
                .totalRevenue(java.math.BigDecimal.ZERO)
                .totalPaidFines(0)
                .build();
    }

    @Transactional(readOnly = true)
    public List<HotBookResponse> getHotBooks(int limit) {
        return Collections.emptyList();
    }

    @Transactional(readOnly = true)
    public byte[] exportReport(String format, String type, String startDate, String endDate) {
        return new byte[0];
    }
}