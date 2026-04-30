package com.barbacode.sales;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public record SaleResponse(
        Long id,
        String uuid,
        String folio,
        SaleStatus status,
        LocalDateTime saleDateTime,
        LocalDate businessDate,
        String customerName,
        String customerEmail,
        String sellerUsername,
        String notes,
        String cancelReason,
        LocalDateTime cancellationDateTime,
        BigDecimal subtotal,
        BigDecimal discountTotal,
        BigDecimal refundTotal,
        BigDecimal total,
        List<SaleItemResponse> items,
        List<SalePaymentResponse> payments,
        List<SaleRefundResponse> refunds
) {
}
