package com.barbacode.reports;

import com.barbacode.common.ApiMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports")
public class ReportsController {

    @GetMapping
    public ResponseEntity<ApiMessage> index() {
        return ResponseEntity.ok(new ApiMessage("reports", "Modulo de reportes listo para implementacion"));
    }
}
