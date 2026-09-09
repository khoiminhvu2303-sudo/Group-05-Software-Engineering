package com.library.controller;

import com.library.dto.response.ApiResponse;
import com.library.dto.response.DashboardResponse;
import com.library.dto.response.BorrowStatsResponse;
import com.library.dto.response.OverdueBookResponse;
import com.library.dto.response.FineRevenueResponse;
import com.library.dto.response.HotBookResponse;
import com.library.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/reports")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('STAFF', 'ADMIN')")
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponse>> getDashboard() {
        DashboardResponse response = reportService.getDashboard();
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/borrow-stats")
    public ResponseEntity<ApiResponse<BorrowStatsResponse>> getBorrowStats(
            @RequestParam String period, // day, week, month, year
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        BorrowStatsResponse response = reportService.getBorrowStats(period, startDate, endDate);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/overdue")
    public ResponseEntity<ApiResponse<Page<OverdueBookResponse>>> getOverdueBooks(Pageable pageable) {
        Page<OverdueBookResponse> page = reportService.getOverdueBooks(pageable);
        return ResponseEntity.ok(ApiResponse.success(page));
    }

    @GetMapping("/fine-revenue")
    public ResponseEntity<ApiResponse<FineRevenueResponse>> getFineRevenue(
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        FineRevenueResponse response = reportService.getFineRevenue(startDate, endDate);
        return ResponseEntity.ok(ApiResponse.success(response));
    }

    @GetMapping("/hot-books")
    public ResponseEntity<ApiResponse<List<HotBookResponse>>> getHotBooks(
            @RequestParam(defaultValue = "10") int limit) {
        List<HotBookResponse> list = reportService.getHotBooks(limit);
        return ResponseEntity.ok(ApiResponse.success(list));
    }

    @GetMapping("/export")
    public ResponseEntity<ApiResponse<byte[]>> exportReport(
            @RequestParam String format, // pdf, excel, csv
            @RequestParam String type,   // borrow, fine, overdue, etc.
            @RequestParam(required = false) String startDate,
            @RequestParam(required = false) String endDate) {
        byte[] file = reportService.exportReport(format, type, startDate, endDate);
        return ResponseEntity.ok(ApiResponse.success(file, "Report exported"));
    }
}
