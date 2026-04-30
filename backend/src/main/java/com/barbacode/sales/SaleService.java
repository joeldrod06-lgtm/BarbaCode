package com.barbacode.sales;

import com.barbacode.products.Product;
import com.barbacode.products.ProductRepository;
import com.barbacode.products.ProductSaleType;
import com.barbacode.products.UnitMeasure;
import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class SaleService {

    private static final BigDecimal ZERO = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);

    private final SaleRepository saleRepository;
    private final SaleItemRepository saleItemRepository;
    private final ProductRepository productRepository;
    private final SaleFolioService saleFolioService;

    public SaleService(
            SaleRepository saleRepository,
            SaleItemRepository saleItemRepository,
            ProductRepository productRepository,
            SaleFolioService saleFolioService
    ) {
        this.saleRepository = saleRepository;
        this.saleItemRepository = saleItemRepository;
        this.productRepository = productRepository;
        this.saleFolioService = saleFolioService;
    }

    @Transactional(readOnly = true)
    public List<SaleResponse> listSales() {
        return saleRepository.findAll().stream()
                .sorted(Comparator.comparing(Sale::getSaleDateTime).reversed())
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public SaleResponse getSale(Long saleId) {
        return toResponse(getDetailedSale(saleId));
    }

    @Transactional
    public SaleResponse createSale(SaleCreateRequest request) {
        LocalDateTime now = LocalDateTime.now();
        Sale sale = new Sale();
        sale.setFolio(saleFolioService.nextSaleFolio(now.toLocalDate()));
        sale.setStatus(SaleStatus.PENDIENTE_PAGO);
        sale.setSaleDateTime(now);
        sale.setBusinessDate(now.toLocalDate());
        sale.setCustomerName(normalizeText(request.customerName()));
        sale.setCustomerEmail(normalizeText(request.customerEmail()));
        sale.setSellerUsername(resolveCurrentUsername());
        sale.setNotes(normalizeText(request.notes()));

        List<SaleItem> items = new ArrayList<>();
        BigDecimal subtotal = ZERO;

        for (SaleCreateItemRequest itemRequest : request.items()) {
            Product product = productRepository.findById(itemRequest.productId())
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Producto no encontrado: " + itemRequest.productId()
                    ));

            if (!product.isActive()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El producto no esta activo: " + product.getName());
            }

            SaleItem item = buildSaleItem(sale, product, itemRequest);
            items.add(item);
            subtotal = subtotal.add(item.getLineTotal());
        }

        sale.getItems().addAll(items);
        sale.setSubtotal(money(subtotal));
        sale.setDiscountTotal(ZERO);
        sale.setRefundTotal(ZERO);
        sale.setTotal(money(subtotal));

        return toResponse(saleRepository.save(sale));
    }

    @Transactional
    public SaleResponse registerPayments(Long saleId, RegisterPaymentsRequest request) {
        Sale sale = getDetailedSale(saleId);

        if (sale.getStatus() == SaleStatus.CANCELADA || sale.getStatus() == SaleStatus.DEVUELTA_TOTAL) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La venta ya no admite pagos");
        }

        BigDecimal currentPaid = sale.getPayments().stream()
                .filter(payment -> payment.getStatus() == PaymentStatus.APLICADO)
                .map(SalePayment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        BigDecimal requestedPayment = BigDecimal.ZERO;

        for (SalePaymentRequest paymentRequest : request.payments()) {
            if (paymentRequest.amount() == null || paymentRequest.amount().compareTo(BigDecimal.ZERO) <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cada pago debe tener un monto mayor a cero");
            }

            SalePayment payment = new SalePayment();
            payment.setSale(sale);
            payment.setPaymentMethod(paymentRequest.paymentMethod());
            payment.setAmount(money(paymentRequest.amount()));
            payment.setReference(normalizeText(paymentRequest.reference()));
            payment.setStatus(PaymentStatus.APLICADO);
            payment.setPaidAt(LocalDateTime.now());
            sale.getPayments().add(payment);
            requestedPayment = requestedPayment.add(payment.getAmount());
        }

        BigDecimal totalPaid = currentPaid.add(requestedPayment);

        if (totalPaid.compareTo(sale.getTotal()) > 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El pago excede el total de la venta");
        }

        sale.setStatus(totalPaid.compareTo(sale.getTotal()) == 0 ? SaleStatus.PAGADA : SaleStatus.PENDIENTE_PAGO);
        return toResponse(saleRepository.save(sale));
    }

    @Transactional
    public SaleResponse cancelSale(Long saleId, CancelSaleRequest request) {
        Sale sale = getDetailedSale(saleId);

        if (sale.getStatus() == SaleStatus.CANCELADA) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La venta ya esta cancelada");
        }

        if (sale.getStatus() == SaleStatus.PAGADA
                || sale.getStatus() == SaleStatus.DEVOLUCION_PARCIAL
                || sale.getStatus() == SaleStatus.DEVUELTA_TOTAL) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Las ventas pagadas deben resolverse por devolucion, no por cancelacion"
            );
        }

        sale.setStatus(SaleStatus.CANCELADA);
        sale.setCancelReason(normalizeRequiredText(request.reason(), "El motivo de cancelacion es obligatorio"));
        sale.setCancellationDateTime(LocalDateTime.now());

        sale.getPayments().forEach(payment -> payment.setStatus(PaymentStatus.ANULADO));
        return toResponse(saleRepository.save(sale));
    }

    @Transactional
    public SaleResponse refundSale(Long saleId, CreateRefundRequest request) {
        Sale sale = getDetailedSale(saleId);

        if (sale.getStatus() != SaleStatus.PAGADA && sale.getStatus() != SaleStatus.DEVOLUCION_PARCIAL) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Solo se pueden devolver ventas pagadas");
        }

        SaleRefund refund = new SaleRefund();
        refund.setSale(sale);
        refund.setReason(normalizeRequiredText(request.reason(), "El motivo de devolucion es obligatorio"));
        refund.setRefundDateTime(LocalDateTime.now());
        refund.setStatus(RefundStatus.REGISTRADA);

        BigDecimal refundTotal = BigDecimal.ZERO;

        for (CreateRefundItemRequest refundItemRequest : request.items()) {
            SaleItem saleItem = saleItemRepository.findByIdAndSaleId(refundItemRequest.saleItemId(), saleId)
                    .orElseThrow(() -> new ResponseStatusException(
                            HttpStatus.NOT_FOUND,
                            "Item de venta no encontrado: " + refundItemRequest.saleItemId()
                    ));

            BigDecimal requestedQuantity = quantity(refundItemRequest.quantity());
            BigDecimal remainingQuantity = saleItem.getQuantity().subtract(saleItem.getRefundedQuantity());

            if (requestedQuantity.compareTo(BigDecimal.ZERO) <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La cantidad a devolver debe ser mayor a cero");
            }

            if (requestedQuantity.compareTo(remainingQuantity) > 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La cantidad a devolver excede lo disponible");
            }

            if (!saleItem.isAllowsPartialRefund() && requestedQuantity.compareTo(remainingQuantity) != 0) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Este producto solo admite devolucion completa del item"
                );
            }

            BigDecimal itemRefundAmount;

            if (saleItem.getSaleType() == ProductSaleType.POR_UNIDAD && saleItem.isAllowsPartialRefund()) {
                itemRefundAmount = money(saleItem.getUnitPrice().multiply(requestedQuantity));
            } else if (requestedQuantity.compareTo(remainingQuantity) == 0) {
                itemRefundAmount = money(saleItem.getLineTotal().subtract(saleItem.getRefundedAmount()));
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La devolucion parcial no esta permitida para este item");
            }

            SaleRefundItem refundItem = new SaleRefundItem();
            refundItem.setRefund(refund);
            refundItem.setSaleItem(saleItem);
            refundItem.setQuantityRefunded(requestedQuantity);
            refundItem.setAmountRefunded(itemRefundAmount);
            refund.getItems().add(refundItem);

            saleItem.setRefundedQuantity(quantity(saleItem.getRefundedQuantity().add(requestedQuantity)));
            saleItem.setRefundedAmount(money(saleItem.getRefundedAmount().add(itemRefundAmount)));
            refundTotal = refundTotal.add(itemRefundAmount);
        }

        refund.setRefundTotal(money(refundTotal));
        sale.getRefunds().add(refund);
        sale.setRefundTotal(money(sale.getRefundTotal().add(refundTotal)));
        sale.setStatus(sale.getRefundTotal().compareTo(sale.getTotal()) == 0
                ? SaleStatus.DEVUELTA_TOTAL
                : SaleStatus.DEVOLUCION_PARCIAL);

        return toResponse(saleRepository.save(sale));
    }

    @Transactional(readOnly = true)
    public SaleTicketResponse getTicket(Long saleId) {
        Sale sale = getDetailedSale(saleId);
        List<SaleTicketItemResponse> items = sale.getItems().stream()
                .map(item -> new SaleTicketItemResponse(
                        item.getProductSnapshotName(),
                        formatQuantityLabel(item),
                        item.getUnitPrice(),
                        item.getLineTotal()
                ))
                .toList();

        List<SaleTicketPaymentResponse> payments = sale.getPayments().stream()
                .filter(payment -> payment.getStatus() == PaymentStatus.APLICADO)
                .map(payment -> new SaleTicketPaymentResponse(
                        payment.getPaymentMethod().name(),
                        payment.getAmount(),
                        payment.getReference()
                ))
                .toList();

        String printableText = buildPrintableText(sale, items, payments);
        String printableHtml = buildPrintableHtml(sale, items, payments);

        return new SaleTicketResponse(
                sale.getFolio(),
                sale.getSaleDateTime(),
                sale.getCustomerName(),
                sale.getCustomerEmail(),
                sale.getSellerUsername(),
                sale.getStatus(),
                items,
                payments,
                sale.getSubtotal(),
                sale.getDiscountTotal(),
                sale.getRefundTotal(),
                sale.getTotal(),
                printableText,
                printableHtml
        );
    }

    @Transactional(readOnly = true)
    public TicketEmailPreviewResponse previewTicketEmail(Long saleId, TicketEmailRequest request) {
        Sale sale = getDetailedSale(saleId);
        SaleTicketResponse ticket = getTicket(saleId);
        String email = normalizeRequiredText(request.email(), "El correo destino es obligatorio");
        String subject = "Ticket de venta %s".formatted(sale.getFolio());

        return new TicketEmailPreviewResponse(
                email,
                subject,
                ticket.printableHtml(),
                "Ticket listo para integrarse con un proveedor de correo"
        );
    }

    private SaleItem buildSaleItem(Sale sale, Product product, SaleCreateItemRequest request) {
        SaleItem item = new SaleItem();
        item.setSale(sale);
        item.setProduct(product);
        item.setProductSnapshotName(product.getName());
        item.setProductSnapshotSku(product.getSku());
        item.setSaleType(product.getSaleType());
        item.setCaptureType(request.captureType());
        item.setUnitMeasure(product.getUnitMeasure());
        item.setUnitPrice(money(product.getUnitPrice()));
        item.setNotes(normalizeText(request.notes()));
        item.setAllowsPartialRefund(product.isAllowsPartialRefund());

        switch (product.getSaleType()) {
            case POR_PESO -> configureWeightItem(item, product, request);
            case POR_UNIDAD -> configureUnitItem(item, request);
        }

        return item;
    }

    private void configureWeightItem(SaleItem item, Product product, SaleCreateItemRequest request) {
        if (request.captureType() == SaleItemCaptureType.UNIDADES) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Los productos por peso no admiten captura por unidades");
        }

        BigDecimal weight;
        BigDecimal requestedAmount = null;

        if (request.captureType() == SaleItemCaptureType.PESO_DIRECTO) {
            weight = weight(request.weightKg());
        } else {
            if (!product.isAllowsSaleByAmount()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El producto no admite venta por importe objetivo");
            }

            requestedAmount = money(request.requestedAmount());
            if (requestedAmount.compareTo(BigDecimal.ZERO) <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El importe objetivo debe ser mayor a cero");
            }

            weight = requestedAmount.divide(product.getUnitPrice(), 3, RoundingMode.HALF_UP);
        }

        if (weight.compareTo(BigDecimal.ZERO) <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El peso debe ser mayor a cero");
        }

        BigDecimal subtotal = money(product.getUnitPrice().multiply(weight));
        item.setQuantity(weight);
        item.setWeightKg(weight);
        item.setRequestedAmount(requestedAmount);
        item.setLineSubtotal(subtotal);
        item.setLineDiscount(ZERO);
        item.setLineTotal(subtotal);
    }

    private void configureUnitItem(SaleItem item, SaleCreateItemRequest request) {
        if (request.captureType() != SaleItemCaptureType.UNIDADES) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Los productos por unidad deben capturarse por unidades");
        }

        BigDecimal units = quantity(request.quantity());
        if (units.compareTo(BigDecimal.ZERO) <= 0 || units.stripTrailingZeros().scale() > 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La cantidad por unidad debe ser un entero mayor a cero");
        }

        BigDecimal subtotal = money(item.getUnitPrice().multiply(units));
        item.setQuantity(units);
        item.setWeightKg(null);
        item.setRequestedAmount(null);
        item.setLineSubtotal(subtotal);
        item.setLineDiscount(ZERO);
        item.setLineTotal(subtotal);
    }

    private Sale getDetailedSale(Long saleId) {
        return saleRepository.findById(saleId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Venta no encontrada: " + saleId));
    }

    private SaleResponse toResponse(Sale sale) {
        List<SaleItemResponse> items = sale.getItems().stream()
                .map(item -> new SaleItemResponse(
                        item.getId(),
                        item.getProduct().getId(),
                        item.getProductSnapshotName(),
                        item.getProductSnapshotSku(),
                        item.getSaleType(),
                        item.getCaptureType(),
                        item.getUnitMeasure(),
                        item.getQuantity(),
                        item.getWeightKg(),
                        item.getRequestedAmount(),
                        item.getUnitPrice(),
                        item.getLineSubtotal(),
                        item.getLineDiscount(),
                        item.getLineTotal(),
                        item.isAllowsPartialRefund(),
                        item.getRefundedQuantity(),
                        item.getRefundedAmount(),
                        item.getNotes()
                ))
                .toList();

        List<SalePaymentResponse> payments = sale.getPayments().stream()
                .map(payment -> new SalePaymentResponse(
                        payment.getId(),
                        payment.getPaymentMethod(),
                        payment.getAmount(),
                        payment.getStatus(),
                        payment.getReference(),
                        payment.getPaidAt()
                ))
                .toList();

        List<SaleRefundResponse> refunds = sale.getRefunds().stream()
                .map(refund -> new SaleRefundResponse(
                        refund.getId(),
                        refund.getReason(),
                        refund.getRefundDateTime(),
                        refund.getRefundTotal(),
                        refund.getStatus(),
                        refund.getItems().stream()
                                .map(item -> new SaleRefundItemResponse(
                                        item.getId(),
                                        item.getSaleItem().getId(),
                                        item.getQuantityRefunded(),
                                        item.getAmountRefunded()
                                ))
                                .toList()
                ))
                .toList();

        return new SaleResponse(
                sale.getId(),
                sale.getUuid(),
                sale.getFolio(),
                sale.getStatus(),
                sale.getSaleDateTime(),
                sale.getBusinessDate(),
                sale.getCustomerName(),
                sale.getCustomerEmail(),
                sale.getSellerUsername(),
                sale.getNotes(),
                sale.getCancelReason(),
                sale.getCancellationDateTime(),
                sale.getSubtotal(),
                sale.getDiscountTotal(),
                sale.getRefundTotal(),
                sale.getTotal(),
                items,
                payments,
                refunds
        );
    }

    private String buildPrintableText(
            Sale sale,
            List<SaleTicketItemResponse> items,
            List<SaleTicketPaymentResponse> payments
    ) {
        StringBuilder builder = new StringBuilder();
        builder.append("BARBACODE").append('\n');
        builder.append("Folio: ").append(sale.getFolio()).append('\n');
        builder.append("Fecha: ").append(sale.getSaleDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"))).append('\n');
        builder.append("Vendedor: ").append(sale.getSellerUsername()).append('\n');
        if (sale.getCustomerName() != null) {
            builder.append("Cliente: ").append(sale.getCustomerName()).append('\n');
        }
        builder.append('\n').append("DETALLE").append('\n');

        for (SaleTicketItemResponse item : items) {
            builder.append("- ")
                    .append(item.description())
                    .append(" | ")
                    .append(item.quantityLabel())
                    .append(" | $")
                    .append(item.lineTotal())
                    .append('\n');
        }

        builder.append('\n').append("PAGOS").append('\n');
        for (SaleTicketPaymentResponse payment : payments) {
            builder.append("- ")
                    .append(payment.paymentMethod())
                    .append(": $")
                    .append(payment.amount());

            if (payment.reference() != null && !payment.reference().isBlank()) {
                builder.append(" (").append(payment.reference()).append(')');
            }

            builder.append('\n');
        }

        builder.append('\n')
                .append("Subtotal: $").append(sale.getSubtotal()).append('\n')
                .append("Descuento: $").append(sale.getDiscountTotal()).append('\n')
                .append("Devoluciones: $").append(sale.getRefundTotal()).append('\n')
                .append("Total: $").append(sale.getTotal()).append('\n')
                .append("Estado: ").append(sale.getStatus().name());
        return builder.toString();
    }

    private String buildPrintableHtml(
            Sale sale,
            List<SaleTicketItemResponse> items,
            List<SaleTicketPaymentResponse> payments
    ) {
        String itemRows = items.stream()
                .map(item -> """
                        <tr>
                          <td>%s</td>
                          <td>%s</td>
                          <td style="text-align:right;">$%s</td>
                        </tr>
                        """.formatted(item.description(), item.quantityLabel(), item.lineTotal()))
                .reduce("", String::concat);

        String paymentRows = payments.stream()
                .map(payment -> """
                        <li>%s - $%s%s</li>
                        """.formatted(
                        payment.paymentMethod(),
                        payment.amount(),
                        payment.reference() == null || payment.reference().isBlank()
                                ? ""
                                : " (" + payment.reference() + ")"
                ))
                .reduce("", String::concat);

        return """
                <html>
                <body style="font-family: Arial, sans-serif; color:#111827;">
                  <h2>BarbaCode</h2>
                  <p><strong>Folio:</strong> %s</p>
                  <p><strong>Fecha:</strong> %s</p>
                  <p><strong>Vendedor:</strong> %s</p>
                  <p><strong>Cliente:</strong> %s</p>
                  <table style="width:100%%; border-collapse:collapse;" border="1" cellpadding="8">
                    <thead>
                      <tr>
                        <th>Concepto</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      %s
                    </tbody>
                  </table>
                  <h3>Pagos</h3>
                  <ul>%s</ul>
                  <p><strong>Subtotal:</strong> $%s</p>
                  <p><strong>Descuento:</strong> $%s</p>
                  <p><strong>Devoluciones:</strong> $%s</p>
                  <p><strong>Total:</strong> $%s</p>
                  <p><strong>Estado:</strong> %s</p>
                </body>
                </html>
                """.formatted(
                sale.getFolio(),
                sale.getSaleDateTime().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm")),
                sale.getSellerUsername(),
                sale.getCustomerName() == null ? "PUBLICO GENERAL" : sale.getCustomerName(),
                itemRows,
                paymentRows,
                sale.getSubtotal(),
                sale.getDiscountTotal(),
                sale.getRefundTotal(),
                sale.getTotal(),
                sale.getStatus().name()
        );
    }

    private String formatQuantityLabel(SaleItem item) {
        if (item.getUnitMeasure() == UnitMeasure.KG) {
            return "%s kg".formatted(item.getQuantity().setScale(3, RoundingMode.HALF_UP));
        }

        return "%s pza".formatted(item.getQuantity().setScale(0, RoundingMode.HALF_UP));
    }

    private String resolveCurrentUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName() == null || authentication.getName().isBlank()) {
            return "system";
        }

        return authentication.getName();
    }

    private BigDecimal money(BigDecimal value) {
        if (value == null) {
            return ZERO;
        }
        return value.setScale(2, RoundingMode.HALF_UP);
    }

    private BigDecimal weight(BigDecimal value) {
        if (value == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El peso es obligatorio");
        }
        return value.setScale(3, RoundingMode.HALF_UP);
    }

    private BigDecimal quantity(BigDecimal value) {
        if (value == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La cantidad es obligatoria");
        }
        return value.setScale(3, RoundingMode.HALF_UP);
    }

    private String normalizeText(String value) {
        if (value == null || value.isBlank()) {
            return null;
        }
        return value.trim();
    }

    private String normalizeRequiredText(String value, String message) {
        String normalized = normalizeText(value);
        if (normalized == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, message);
        }
        return normalized;
    }
}
