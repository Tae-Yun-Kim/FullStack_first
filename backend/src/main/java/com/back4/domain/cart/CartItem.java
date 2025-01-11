package com.back4.domain.cart;

import com.back4.domain.mealkit.Mealkit;
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
@ToString(exclude = "cart")
@Table(name = "mealkit_cart_item",
        indexes = {@Index(columnList = "cart_cid", name = "idx_cartitem_cart"),
        @Index(columnList = "mealkit_mid, cart_cid", name = "idx_cartitem_mid_cart")})
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ciid;

    @ManyToOne
    @JoinColumn(name = "mealkit_mid")
    private Mealkit mealkit;

    @ManyToOne
    @JoinColumn(name = "cart_cid")
    private Cart cart;

    private int quantity;


    public void changeQuantity(int quantity) {
        this.quantity = quantity;
    }


}
