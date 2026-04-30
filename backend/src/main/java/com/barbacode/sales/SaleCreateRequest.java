package com.barbacode.sales;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record SaleCreateRequest(
        String customerName,
        String customerEmail,
        String notes,
        @NotEmpty List<@Valid SaleCreateItemRequest> items
) {
}
