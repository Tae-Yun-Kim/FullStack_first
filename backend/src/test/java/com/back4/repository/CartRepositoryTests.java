//package com.back4.repository;
//
//import com.back4.domain.cart.Cart;
//import com.back4.domain.cart.CartItem;
//import com.back4.domain.mealkit.Mealkit;
//import com.back4.domain.member.Member;
//import com.back4.dto.cart.CartItemListDTO;
//import com.back4.repository.cart.CartItemRepository;
//import com.back4.repository.cart.CartRepository;
//import lombok.extern.log4j.Log4j2;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.test.annotation.Commit;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//import java.util.Optional;
//
//@SpringBootTest
//@Log4j2
//public class CartRepositoryTests {
//
//    @Autowired
//    private CartRepository cartRepository;
//
//    @Autowired
//    private CartItemRepository cartItemRepository;
//
//    @Transactional
//    @Commit
//    @Test
//    public void testInsertByProduct() {
//         log.info("test1--------------------");
//
//         //사용자가 전송하는 정보
//        String email = "test@bbb.com";
//        Long mid = 1L;
//        int quantity = 2;
//
//        //만일 기존에 사용자의 장바구니 아이템이 있었다면
//
//        CartItem cartItem = cartItemRepository.getItemOfMid(email, mid);
//
//        if(cartItem != null) {
//            cartItem.changeQuantity(quantity);
//            cartItemRepository.save(cartItem);
//
//            return;
//        }
//
//        Optional<Cart> result = cartRepository.getCartOfMember(email);
//
//        Cart cart = null;
//
//        //사용자의 장바구니가 존재하지 않으면 장바구니 생성
//        if(result.isEmpty()) {
//            log.info("장바구니가 존재하지 않습니다.");
//
//            Member member = Member.builder().email(email).build();
//
//            Cart tempCart = Cart.builder().owner(member).build();
//
//            cart = cartRepository.save(tempCart);
//        } else {
//            cart = result.get();
//        }
//
//        log.info(cart);
//
//        if(cartItem == null) {
//            Mealkit mealkit = Mealkit.builder().mid(mid).build();
//            cartItem = CartItem.builder().mealkit(mealkit).cart(cart).quantity(quantity).build();
//        }
//
//        //장바구니 저장
//        cartItemRepository.save(cartItem);
//    }
//
//    @Test
//    @Commit
//    public void testUpdateByCiid() {
//        Long ciid = 1L;
//        int quantity = 4;
//        Optional<CartItem> result = cartItemRepository.findById(ciid);
//        CartItem cartItem = result.orElseThrow();
//        cartItem.changeQuantity(quantity);
//        cartItemRepository.save(cartItem);
//    }
//
//    @Test
//    public void testListOfMember() {
//
//        String email = "test@bbb.com";
//
//        List<CartItemListDTO> cartItemList = cartItemRepository.getItemsOfCartDTOByEmail(email);
//
//        for(CartItemListDTO dto : cartItemList) {
//            log.info(dto);
//        }
//    }
//
//    @Test
//    public void testDeleteThenList() {
//        Long ciid = 1L;
//
//        Long cid = cartItemRepository.getCartFromItem(ciid);
//
//        cartItemRepository.deleteById(ciid);
//
//        List<CartItemListDTO> cartItemList = cartItemRepository.getItemsOfCartDTOByCart(cid);
//
//        for(CartItemListDTO dto : cartItemList) {
//            log.info(dto);
//        }
//    }
//}
