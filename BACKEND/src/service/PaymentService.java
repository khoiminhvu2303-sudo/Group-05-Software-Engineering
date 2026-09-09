package com.library.service.impl;

import com.library.service.FineService;
import com.library.service.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final FineService fineService;

    @Override
    public boolean processPayment(String fineId, BigDecimal amount) {
        // Payment gateway integration logic (VNPay / MoMo)
        fineService.payFine(fineId, amount);
        return true;
    }
}
