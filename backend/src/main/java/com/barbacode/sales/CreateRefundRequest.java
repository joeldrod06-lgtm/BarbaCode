package com.barbacode.sales;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record CreateRefundRequest(
        @NotBlank String reason,
        @NotEmpty List<@Valid CreateRefundItemRequest> items
) {
}
