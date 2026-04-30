package com.barbacode.sales;

public record TicketEmailPreviewResponse(
        String email,
        String subject,
        String html,
        String message
) {
}
