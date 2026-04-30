package com.barbacode.products;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductsController {

    private final ProductRepository productRepository;

    @GetMapping
    public List<ProductResponse> index() {
        return productRepository.findAllByActiveTrueOrderByNameAsc().stream()
                .map(product -> new ProductResponse(
                        product.getId(),
                        product.getSku(),
                        product.getName(),
                        product.getDescription(),
                        product.getSaleType(),
                        product.getUnitMeasure(),
                        product.getUnitPrice(),
                        product.isAllowsSaleByAmount(),
                        product.isAllowsPartialRefund(),
                        product.isStockTracked(),
                        product.getCurrentStock(),
                        product.isActive()
                ))
                .toList();
    }
}
