package com.barbacode.dashboard;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @GetMapping
    public ResponseEntity<DashboardSummaryResponse> getSummary() {
        return ResponseEntity.ok(new DashboardSummaryResponse(12450.0, 43, 6, 4280.0));
    }
}
