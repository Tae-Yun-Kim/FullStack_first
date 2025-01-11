package com.back4.service.cart;

import com.back4.domain.cart.Cart;
import com.back4.domain.cart.CartItem;
import com.back4.domain.mealkit.Mealkit;
import com.back4.domain.member.Member;
import com.back4.dto.cart.CartItemDTO;
import com.back4.dto.cart.CartItemListDTO;
import com.back4.dto.product.ProductDTO;
import com.back4.repository.cart.CartItemRepository;
import com.back4.repository.cart.CartRepository;
import com.back4.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Log4j2
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
//    public List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO) {
//        String email = cartItemDTO.getEmail();
//
//        Long mid = cartItemDTO.getMid();
//
//        int quantity = cartItemDTO.getQuantity();
//
//        Long ciid = cartItemDTO.getCiid();
//
//        log.info("===========================================");
//        log.info(cartItemDTO.getCiid() == null);
//
//        if(ciid != null) {
//            Optional<CartItem> cartItemResult = cartItemRepository.findById(ciid);
//
//            CartItem cartItem = cartItemResult.orElseThrow();
//
//            cartItem.changeQuantity(quantity);
//
//            cartItemRepository.save(cartItem);
//
//            return getCartItems(email);
//        }
//
//        Cart cart = getCart(email);
//
//        CartItem cartItem = null;
//
//        cartItem = cartItemRepository.getItemOfMid(email, mid);
//
//        if(cartItem == null) {
//            Mealkit mealkit = Mealkit.builder().mid(mid).build();
//            cartItem = CartItem.builder().mealkit(mealkit).cart(cart).quantity(quantity).build();
//
//        } else {
//            cartItem.changeQuantity(quantity);
//        }
//
//        cartItemRepository.save(cartItem);
//
//        return getCartItems(email);
//    }

//    public List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO) {
//        log.info("addOrModify 요청 데이터: {}", cartItemDTO);
//
//        if (cartItemDTO.getEmail() == null || cartItemDTO.getMid() == null) {
//            throw new IllegalArgumentException("필수 값 누락: email 또는 mid가 null입니다.");
//        }
//
//        // ciid가 없는 경우 신규 항목 추가
//        if (cartItemDTO.getCiid() == null) {
//            Cart cart = getCart(cartItemDTO.getEmail());
//            Mealkit mealkit = Mealkit.builder().mid(cartItemDTO.getMid()).build();
//            CartItem newItem = CartItem.builder()
//                    .cart(cart)
//                    .mealkit(mealkit)
//                    .quantity(cartItemDTO.getQuantity())
//                    .build();
//
//            cartItemRepository.save(newItem);
//            return getCartItems(cartItemDTO.getEmail());
//        }
//
//        // 수정 로직
//        Optional<CartItem> existingItem = cartItemRepository.findById(cartItemDTO.getCiid());
//        if (existingItem.isPresent()) {
//            CartItem cartItem = existingItem.get();
//            cartItem.changeQuantity(cartItemDTO.getQuantity());
//            cartItemRepository.save(cartItem);
//            return getCartItems(cartItemDTO.getEmail());
//        } else {
//            throw new IllegalArgumentException("ciid에 해당하는 장바구니 항목이 존재하지 않습니다.");
//        }
//    }

    public List<CartItemListDTO> addOrModify(CartItemDTO cartItemDTO) {
        log.info("addOrModify 요청 데이터: {}", cartItemDTO);

        // 필수 값 확인
        if (cartItemDTO.getEmail() == null || cartItemDTO.getMid() == null) {
            throw new IllegalArgumentException("필수 값 누락: email 또는 mid가 null입니다.");
        }

        // 사용자 장바구니 가져오기
        Cart cart = getCart(cartItemDTO.getEmail());
        Mealkit mealkit = Mealkit.builder().mid(cartItemDTO.getMid()).build();


        // 기존 항목 조회
        Optional<CartItem> existingItemOpt = cartItemRepository.getItemOfMid(cartItemDTO.getEmail(), cartItemDTO.getMid());
        log.info("기존 장바구니 항목 조회 결과: {}", existingItemOpt.orElse(null));

        if (existingItemOpt.isPresent()) {
            // 기존 항목이 있으면 수량 업데이트
            CartItem existingItem = existingItemOpt.get();
            int newQuantity = cartItemDTO.getQuantity();

            // 수량이 0 이하가 되는 경우 삭제
            if (newQuantity <= 0) {
                cartItemRepository.delete(existingItem);
                log.info("장바구니 항목 삭제: {}", existingItem.getCiid());
            } else {
                existingItem.changeQuantity(newQuantity);
                cartItemRepository.save(existingItem);
                log.info("장바구니 항목 업데이트: {}", existingItem.getCiid(), newQuantity);
            }
        } else {
            // 중복 항목이 없으면 새로 추가
            if (cartItemDTO.getQuantity() > 0) {
                CartItem newItem = CartItem.builder()
                        .cart(cart)
                        .mealkit(mealkit)
                        .quantity(cartItemDTO.getQuantity())
                        .build();
                cartItemRepository.save(newItem);
                log.info("장바구니 항목 추가: {}", newItem.getCiid());
            } else {
                log.warn("추가하려는 항목의 수량이 0 이하입니다. 아무 작업도 수행하지 않습니다.");
            }
        }

        // 최신 장바구니 항목 반환
//        List<CartItemListDTO> updatedCartItems = getCartItems(cartItemDTO.getEmail());
        List<CartItemListDTO> updatedCartItems = getCartItems(cartItemDTO.getEmail());

        // 각 항목에 products 배열 추가
        log.info("최신 장바구니 항목 반환: {}", updatedCartItems);
        return updatedCartItems;
    }

    //사용자의 장바구니가 없었다면 새로운 장바구니 생성
    private Cart getCart(String email) {
        Cart cart = null;

        Optional<Cart> result = cartRepository.getCartOfMember(email);

        if(result.isEmpty()) {

            log.info("회원님의 카트를 찾을 수 없습니다.");

//            Member member = Member.builder().email(email).build();
//
//            Cart tempCart = Cart.builder().owner(member).build();
//
//            cart = cartRepository.save(tempCart);
            // Member를 데이터베이스에서 조회
            Member member = memberRepository.findByEmail(email)
                    .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다. email: " + email));

            // Cart 생성 및 저장
            Cart tempCart = Cart.builder().owner(member).build();
            cart = cartRepository.save(tempCart);

        } else {
            cart = result.get();
        }

        return cart;
    }

    @Override
    public List<CartItemListDTO> getCartItems(String email) {
        return cartItemRepository.getItemsOfCartDTOByEmail(email);
    }

    @Override
    public List<CartItemListDTO> remove(Long ciid) {

        if (ciid == null) {
            throw new IllegalArgumentException("ciid 값이 null입니다.");
        }

        Long cid = cartItemRepository.getCartFromItem(ciid);

        if (cid == null) {
            throw new IllegalArgumentException("ciid에 해당하는 카트가 없습니다.");
        }

        log.info("카트 번호 : " + cid);

        cartItemRepository.deleteById(ciid);

        // 최신 장바구니 항목 반환
        List<CartItemListDTO> updatedCartItems = cartItemRepository.getItemsOfCartDTOByCart(cid);
        log.info("최신 장바구니 항목 반환: {}", updatedCartItems);

        return updatedCartItems;


    }
}
