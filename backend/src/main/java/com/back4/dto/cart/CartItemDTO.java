package com.back4.dto.cart;

import lombok.Data;
import java.util.List;

@Data
public class CartItemDTO {

    private String email; // 클라이언트와 필드 이름 매칭
    private Long mid;     // 클라이언트와 필드 이름 매칭
    private int quantity;
    private Long ciid;


    private List<ProductDTO> products; // 제품 목록 추가

    @Data
    public static class ProductDTO {
        private Long mpid;      // 제품 매핑 ID
        private int quantity;   // 수량
    }
}
