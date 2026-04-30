package com.barbacode.products;

import java.math.BigDecimal;

public record ProductResponse(
        Long id,
        String sku,
        String name,
        String description,
        ProductSaleType saleType,
        UnitMeasure unitMeasure,
        BigDecimal unitPrice,
        boolean allowsSaleByAmount,
        boolean allowsPartialRefund,
        boolean stockTracked,
        BigDecimal currentStock,
        boolean active
) {
}
