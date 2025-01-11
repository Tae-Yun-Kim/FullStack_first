package com.back4.dto.cart;

import com.back4.dto.product.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartItemListDTO {
    private Long ciid;
    private int quantity;
    private Long mid;

    private String mname;

    private  int price;

    private String imageFile;

    private int totalPrice;


//    private List<ProductDTO> products;

    public CartItemListDTO(Long ciid, int quantity, Long mid, String mname, int price, String imageFile){
        this.ciid = ciid;
        this.quantity = quantity;
        this.mid = mid;
        this.mname = mname;
        this.price = price;
        this.imageFile = imageFile;
    }
}
