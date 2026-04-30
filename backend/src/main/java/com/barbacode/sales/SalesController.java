package com.barbacode.sales;

import com.barbacode.common.ApiMessage;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sales")
@RequiredArgsConstructor
public class SalesController {

    private final SaleService saleService;

    @GetMapping
    public List<SaleResponse> index() {
        return saleService.listSales();
    }

    @GetMapping("/{saleId}")
    public SaleResponse show(@PathVariable Long saleId) {
        return saleService.getSale(saleId);
    }

    @PostMapping
    public SaleResponse create(@Valid @RequestBody SaleCreateRequest request) {
        return saleService.createSale(request);
    }

    @PostMapping("/{saleId}/payments")
    public SaleResponse registerPayments(@PathVariable Long saleId, @Valid @RequestBody RegisterPaymentsRequest request) {
        return saleService.registerPayments(saleId, request);
    }

    @PostMapping("/{saleId}/cancel")
    public SaleResponse cancel(@PathVariable Long saleId, @Valid @RequestBody CancelSaleRequest request) {
        return saleService.cancelSale(saleId, request);
    }

    @PostMapping("/{saleId}/refunds")
    public SaleResponse refund(@PathVariable Long saleId, @Valid @RequestBody CreateRefundRequest request) {
        return saleService.refundSale(saleId, request);
    }

    @GetMapping("/{saleId}/ticket")
    public SaleTicketResponse ticket(@PathVariable Long saleId) {
        return saleService.getTicket(saleId);
    }

    @GetMapping(value = "/{saleId}/ticket/html", produces = MediaType.TEXT_HTML_VALUE)
    public String ticketHtml(@PathVariable Long saleId) {
        return saleService.getTicket(saleId).printableHtml();
    }

    @PostMapping("/{saleId}/ticket/email")
    public TicketEmailPreviewResponse previewTicketEmail(
            @PathVariable Long saleId,
            @Valid @RequestBody TicketEmailRequest request
    ) {
        return saleService.previewTicketEmail(saleId, request);
    }

    @PostMapping("/{saleId}/ticket/mark-sent")
    public ResponseEntity<ApiMessage> markSent(@PathVariable Long saleId) {
        saleService.getSale(saleId);
        return ResponseEntity.ok(new ApiMessage("sales", "Ticket listo para integracion con impresion o envio"));
    }
}
