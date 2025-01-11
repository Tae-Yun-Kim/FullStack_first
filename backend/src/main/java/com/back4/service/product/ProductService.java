package com.back4.service.product;

import com.back4.dto.product.ProductDTO;

import java.util.List;

public interface ProductService {
    Long register(ProductDTO productDTO);//밀키트 추가
    void update(ProductDTO productDTO);//밀키트 수정
    void remove(Long pid);//밀키트 삭제
    ProductDTO get(Long pid);//밀키트 조회
    List<ProductDTO> getAll();//모든 밀키트 조회//모든 재료 조회
}
