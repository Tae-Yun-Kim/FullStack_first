package com.back4.dto.mealkit;

import com.back4.dto.product.ProductDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MealkitProductDTO {
    private Long mpid;
    private ProductDTO product;
    private int quantity;
}
