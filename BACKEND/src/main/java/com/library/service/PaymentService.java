package com.library.service;

import com.library.dto.request.PayFineRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final FineService fineService;

    public boolean processPayment(String fineId, BigDecimal amount) {
        PayFineRequest request = new PayFineRequest();
        request.setAmount(amount);
        fineService.payFine(fineId, request);
        return true;
    }
}