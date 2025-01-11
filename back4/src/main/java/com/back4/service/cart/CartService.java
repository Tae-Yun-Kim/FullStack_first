package com.back4.service.cart;

import com.back4.dto.cart.CartItemDTO;
import com.back4.dto.cart.CartItemListDTO;

import java.util.List;

public interface CartService {

    //장바구니 아이템 추가 혹은 변경
    public List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO);

    //모든 장바구니 아이템 목록
    public List<CartItemListDTO> getCartItems(String email);

    //아이템 삭제
    public List<CartItemListDTO> remove(Long ciid);
}
