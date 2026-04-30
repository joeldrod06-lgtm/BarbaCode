package com.barbacode.sales;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record SaleCreateItemRequest(
        @NotNull Long productId,
        @NotNull SaleItemCaptureType captureType,
        BigDecimal quantity,
        BigDecimal weightKg,
        BigDecimal requestedAmount,
        String notes
) {
}
