package com.barbacode.sales;

import com.barbacode.common.ApiMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sales")
public class SalesController {

    @GetMapping
    public ResponseEntity<ApiMessage> index() {
        return ResponseEntity.ok(new ApiMessage("sales", "Modulo de ventas listo para implementacion"));
    }
}
