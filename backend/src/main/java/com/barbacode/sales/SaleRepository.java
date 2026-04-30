package com.barbacode.sales;

import java.util.List;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleRepository extends JpaRepository<Sale, Long> {

    @Override
    @EntityGraph(attributePaths = {"items", "payments", "refunds"})
    List<Sale> findAll();

    @Override
    @EntityGraph(attributePaths = {"items", "payments", "refunds", "refunds.items"})
    java.util.Optional<Sale> findById(Long id);
}
