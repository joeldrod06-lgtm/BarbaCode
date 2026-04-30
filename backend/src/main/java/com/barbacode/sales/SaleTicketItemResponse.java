package com.barbacode.sales;

import java.math.BigDecimal;

public record SaleTicketItemResponse(
        String description,
        String quantityLabel,
        BigDecimal unitPrice,
        BigDecimal lineTotal
) {
}
