package com.barbacode.expenses;

import com.barbacode.common.ApiMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/expenses")
public class ExpensesController {

    @GetMapping
    public ResponseEntity<ApiMessage> index() {
        return ResponseEntity.ok(new ApiMessage("expenses", "Modulo de gastos listo para implementacion"));
    }
}
