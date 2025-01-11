package com.back4.domain.mealkit;

import com.back4.domain.product.Product;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mealkit_product")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MealkitProduct {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mpid;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mealkit_mid")
    private Mealkit mealkit;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_pid")
    private Product product;

    private int quantity;
}
