package com.back4.domain.cart;

import com.back4.domain.member.Member;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString(exclude = "owner")
@Table(name = "mealkit_cart", indexes = { @Index(name = "idx_cart_email", columnList = "member_owner")})
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cid;

    @OneToOne
    @JoinColumn(name = "member_owner")
    private Member owner;
}
