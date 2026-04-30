package com.barbacode.sales;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record SalePaymentResponse(
        Long id,
        PaymentMethod paymentMethod,
        BigDecimal amount,
        PaymentStatus status,
        String reference,
        LocalDateTime paidAt
) {
}
