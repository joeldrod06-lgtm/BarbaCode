package com.barbacode.inventory;

import com.barbacode.common.ApiMessage;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/inventory")
public class InventoryController {

    @GetMapping
    public ResponseEntity<ApiMessage> index() {
        return ResponseEntity.ok(new ApiMessage("inventory", "Modulo de inventario listo para implementacion"));
    }
}
