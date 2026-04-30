package com.barbacode.sales;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record SalePaymentRequest(
        @NotNull PaymentMethod paymentMethod,
        @NotNull BigDecimal amount,
        String reference
) {
}
