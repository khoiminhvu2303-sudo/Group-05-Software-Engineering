package com.library.service;

import com.library.dto.request.PayFineRequest;
import com.library.dto.response.FineResponse;
import com.library.entity.FineReceipt;
import com.library.exception.InvalidOperationException;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.FineReceiptRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FineService {

    private final FineReceiptRepository fineReceiptRepository;

    @Transactional
    public FineResponse createFine(FineResponse request) {
        FineReceipt receipt = new FineReceipt();
        receipt.setFineID("FINE-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        receipt.setAmount(request.getAmount());
        receipt.setPaymentStatus("UNPAID");
        receipt.setDescribe(request.getDescription());

        FineReceipt saved = fineReceiptRepository.save(receipt);
        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public Page<FineResponse> getAllFines(String status, Pageable pageable) {
        Page<FineReceipt> page = fineReceiptRepository.findAll(pageable);
        List<FineResponse> responses = page.getContent().stream()
                .filter(r -> status == null || status.equalsIgnoreCase(r.getPaymentStatus()))
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responses, pageable, page.getTotalElements());
    }

    @Transactional(readOnly = true)
    public FineResponse getFineById(String id) {
        FineReceipt receipt = fineReceiptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fine receipt not found: " + id));
        return mapToResponse(receipt);
    }

    @Transactional
    public FineResponse payFine(String id, PayFineRequest request) {
        FineReceipt receipt = fineReceiptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fine receipt not found: " + id));

        if ("PAID".equalsIgnoreCase(receipt.getPaymentStatus())) {
            throw new InvalidOperationException("Fine receipt is already paid");
        }

        if (request != null && request.getAmount() != null && receipt.getAmount() != null 
                && receipt.getAmount().compareTo(request.getAmount()) > 0) {
            throw new InvalidOperationException("Insufficient payment amount");
        }

        receipt.setPaymentStatus("PAID");
        FineReceipt updated = fineReceiptRepository.save(receipt);
        return mapToResponse(updated);
    }

    // Overload giúp PaymentService gọi mượt mà không bị mismatch tham số
    @Transactional
    public FineResponse payFine(String id, BigDecimal amount) {
        PayFineRequest request = new PayFineRequest();
        request.setAmount(amount);
        return payFine(id, request);
    }

    @Transactional(readOnly = true)
    public Page<FineResponse> getMyFines(Pageable pageable) {
        Page<FineReceipt> page = fineReceiptRepository.findAll(pageable);
        List<FineResponse> responses = page.getContent().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());

        return new PageImpl<>(responses, pageable, page.getTotalElements());
    }

    @Transactional(readOnly = true)
    public byte[] printReceipt(String id) {
        fineReceiptRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Fine receipt not found: " + id));
        return new byte[0];
    }

    private FineResponse mapToResponse(FineReceipt receipt) {
        String borrowerId = null;
        if (receipt.getBorrowRecord() != null && receipt.getBorrowRecord().getReader() != null) {
            borrowerId = receipt.getBorrowRecord().getReader().getReaderId();
        }

        return FineResponse.builder()
                .fineId(receipt.getFineID())
                .borrowerId(borrowerId)
                .description(receipt.getDescribe())
                .amount(receipt.getAmount())
                .status(receipt.getPaymentStatus())
                .build();
    }
}