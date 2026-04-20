package com.barbacode.customers;

import com.barbacode.common.ApiMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/customers")
public class CustomersController {

    @GetMapping
    public ResponseEntity<ApiMessage> index() {
        return ResponseEntity.ok(new ApiMessage("customers", "Modulo de clientes listo para implementacion"));
    }
}
