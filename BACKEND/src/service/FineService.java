package com.library.service.impl;

import com.library.entity.FineReceipt;
import com.library.exception.InvalidOperationException;
import com.library.exception.ResourceNotFoundException;
import com.library.repository.FineReceiptRepository;
import com.library.service.FineService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class FineServiceImpl implements FineService {

    private final FineReceiptRepository fineReceiptRepository;

    @Override
    @Transactional
    public void payFine(String fineId, BigDecimal amount) {
        FineReceipt receipt = fineReceiptRepository.findById(fineId)
                .orElseThrow(() -> new ResourceNotFoundException("Fine receipt not found: " + fineId));

        if ("PAID".equalsIgnoreCase(receipt.getPaymentStatus())) {
            throw new InvalidOperationException("Fine receipt is already paid");
        }

        if (receipt.getAmount().compareTo(amount) > 0) {
            throw new InvalidOperationException("Insufficient payment amount");
        }

        receipt.setPaymentStatus("PAID");
        fineReceiptRepository.save(receipt);
    }
}
