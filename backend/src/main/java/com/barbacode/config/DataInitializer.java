package com.barbacode.config;

import com.barbacode.products.Product;
import com.barbacode.products.ProductRepository;
import com.barbacode.products.ProductSaleType;
import com.barbacode.products.UnitMeasure;
import com.barbacode.users.Role;
import com.barbacode.users.User;
import com.barbacode.users.UserRepository;
import java.math.BigDecimal;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    @Bean
    CommandLineRunner seedData() {
        return args -> {
            seedUsers();
            seedProducts();
        };
    }

    private void seedUsers() {
        if (userRepository.findByUsername("admin").isPresent()) {
            return;
        }

        User admin = new User();
        admin.setUsername("admin");
        admin.setPassword("admin");
        admin.setRole(Role.ADMIN);
        userRepository.save(admin);
    }

    private void seedProducts() {
        if (productRepository.count() > 0) {
            return;
        }

        productRepository.save(product(
                "BARB-MACIZA",
                "Barbacoa maciza",
                "Barbacoa por kilo tipo maciza",
                ProductSaleType.POR_PESO,
                UnitMeasure.KG,
                new BigDecimal("520.00"),
                true,
                false,
                false,
                new BigDecimal("0.000")
        ));
        productRepository.save(product(
                "BARB-SURTIDA",
                "Barbacoa surtida",
                "Barbacoa por kilo tipo surtida",
                ProductSaleType.POR_PESO,
                UnitMeasure.KG,
                new BigDecimal("480.00"),
                true,
                false,
                false,
                new BigDecimal("0.000")
        ));
        productRepository.save(product(
                "TACO-SURTIDO",
                "Taco surtido",
                "Taco unitario de surtido",
                ProductSaleType.POR_UNIDAD,
                UnitMeasure.PIEZA,
                new BigDecimal("28.00"),
                false,
                false,
                false,
                new BigDecimal("0.000")
        ));
        productRepository.save(product(
                "REF-355",
                "Refresco lata",
                "Bebida en lata 355 ml",
                ProductSaleType.POR_UNIDAD,
                UnitMeasure.PIEZA,
                new BigDecimal("25.00"),
                false,
                true,
                true,
                new BigDecimal("120.000")
        ));
        productRepository.save(product(
                "CONSOME-CH",
                "Consome chico",
                "Consome chico unitario",
                ProductSaleType.POR_UNIDAD,
                UnitMeasure.PIEZA,
                new BigDecimal("35.00"),
                false,
                false,
                false,
                new BigDecimal("0.000")
        ));
    }

    private Product product(
            String sku,
            String name,
            String description,
            ProductSaleType saleType,
            UnitMeasure unitMeasure,
            BigDecimal unitPrice,
            boolean allowsSaleByAmount,
            boolean allowsPartialRefund,
            boolean stockTracked,
            BigDecimal currentStock
    ) {
        Product product = new Product();
        product.setSku(sku);
        product.setName(name);
        product.setDescription(description);
        product.setSaleType(saleType);
        product.setUnitMeasure(unitMeasure);
        product.setUnitPrice(unitPrice);
        product.setAllowsSaleByAmount(allowsSaleByAmount);
        product.setAllowsPartialRefund(allowsPartialRefund);
        product.setStockTracked(stockTracked);
        product.setCurrentStock(currentStock);
        product.setActive(true);
        return product;
    }
}
