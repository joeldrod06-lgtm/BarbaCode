package com.barbacode.sales;

import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public record CreateRefundItemRequest(
        @NotNull Long saleItemId,
        @NotNull BigDecimal quantity
) {
}
