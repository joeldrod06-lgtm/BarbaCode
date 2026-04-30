package com.barbacode.sales;

import com.barbacode.products.Product;
import com.barbacode.products.ProductSaleType;
import com.barbacode.products.UnitMeasure;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "sale_items")
public class SaleItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "sale_id")
    private Sale sale;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id")
    private Product product;

    @Column(nullable = false, length = 140)
    private String productSnapshotName;

    @Column(nullable = false, length = 40)
    private String productSnapshotSku;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ProductSaleType saleType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private SaleItemCaptureType captureType;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private UnitMeasure unitMeasure;

    @Column(nullable = false, precision = 12, scale = 3)
    private BigDecimal quantity;

    @Column(precision = 12, scale = 3)
    private BigDecimal weightKg;

    @Column(precision = 12, scale = 2)
    private BigDecimal requestedAmount;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal unitPrice;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal lineSubtotal;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal lineDiscount = BigDecimal.ZERO;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal lineTotal;

    @Column(nullable = false)
    private boolean allowsPartialRefund;

    @Column(nullable = false, precision = 12, scale = 3)
    private BigDecimal refundedQuantity = BigDecimal.ZERO;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal refundedAmount = BigDecimal.ZERO;

    @Column(length = 250)
    private String notes;
}
