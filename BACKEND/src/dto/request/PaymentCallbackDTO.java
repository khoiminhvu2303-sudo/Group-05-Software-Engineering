package com.library.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentCallbackDTO {

    private String vnp_ResponseCode;
    private String vnp_TxnRef;
    private String vnp_Amount;
    private String vnp_OrderInfo;
    private String vnp_TransactionNo;
    private String vnp_SecureHash;
}
