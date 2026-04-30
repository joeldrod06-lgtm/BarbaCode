package com.barbacode.sales;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record TicketEmailRequest(@Email @NotBlank String email) {
}
