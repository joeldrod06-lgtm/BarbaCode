package com.barbacode.sales;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record SaleRefundResponse(
        Long id,
        String reason,
        LocalDateTime refundDateTime,
        BigDecimal refundTotal,
        RefundStatus status,
        List<SaleRefundItemResponse> items
) {
}
