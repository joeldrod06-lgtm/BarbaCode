package com.barbacode.sales;

import java.math.BigDecimal;

public record SaleRefundItemResponse(
        Long id,
        Long saleItemId,
        BigDecimal quantityRefunded,
        BigDecimal amountRefunded
) {
}
