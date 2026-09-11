package com.library.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final FineService fineService;

    public boolean processPayment(String fineId, BigDecimal amount) {
        fineService.payFine(fineId, amount);
        return true;
    }
}
