package com.barbacode.sales;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record SaleTicketResponse(
        String folio,
        LocalDateTime saleDateTime,
        String customerName,
        String customerEmail,
        String sellerUsername,
        SaleStatus status,
        List<SaleTicketItemResponse> items,
        List<SaleTicketPaymentResponse> payments,
        BigDecimal subtotal,
        BigDecimal discountTotal,
        BigDecimal refundTotal,
        BigDecimal total,
        String printableText,
        String printableHtml
) {
}
