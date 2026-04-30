package com.barbacode.sales;

import com.barbacode.products.ProductSaleType;
import com.barbacode.products.UnitMeasure;
import java.math.BigDecimal;

public record SaleItemResponse(
        Long id,
        Long productId,
        String productName,
        String productSku,
        ProductSaleType saleType,
        SaleItemCaptureType captureType,
        UnitMeasure unitMeasure,
        BigDecimal quantity,
        BigDecimal weightKg,
        BigDecimal requestedAmount,
        BigDecimal unitPrice,
        BigDecimal lineSubtotal,
        BigDecimal lineDiscount,
        BigDecimal lineTotal,
        boolean allowsPartialRefund,
        BigDecimal refundedQuantity,
        BigDecimal refundedAmount,
        String notes
) {
}
