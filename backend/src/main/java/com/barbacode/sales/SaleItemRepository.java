package com.barbacode.sales;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SaleItemRepository extends JpaRepository<SaleItem, Long> {

    Optional<SaleItem> findByIdAndSaleId(Long id, Long saleId);
}
