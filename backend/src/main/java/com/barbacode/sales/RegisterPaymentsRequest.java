package com.barbacode.sales;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record RegisterPaymentsRequest(@NotEmpty List<@Valid SalePaymentRequest> payments) {
}
