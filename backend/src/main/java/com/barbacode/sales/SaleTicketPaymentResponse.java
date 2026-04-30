package com.barbacode.sales;

import java.math.BigDecimal;

public record SaleTicketPaymentResponse(
        String paymentMethod,
        BigDecimal amount,
        String reference
) {
}
