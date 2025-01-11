package com.back4.controller.cart;

import com.back4.dto.cart.CartItemDTO;
import com.back4.dto.cart.CartItemListDTO;
import com.back4.service.cart.CartService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/cart")
public class CartController {

    private final CartService cartService;


    @PreAuthorize("#itemDTO.email == authentication.name")
    @PostMapping("/change")
    public ResponseEntity<List<CartItemListDTO>> changeCart(@RequestBody CartItemDTO itemDTO) {

        log.info(itemDTO);

        if(itemDTO.getQuantity() <= 0) { //장바구니에 담긴게 없으면
            List<CartItemListDTO> updatedCartItems = cartService.remove(itemDTO.getCiid());
            return ResponseEntity.ok(updatedCartItems); // 장바구니 지우기
        }
//        return cartService.addOrModify(itemDTO);
        List<CartItemListDTO> updatedCartItems = cartService.addOrModify(itemDTO);
        return ResponseEntity.ok(updatedCartItems); // 성공 응답 반환
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
//    @GetMapping("/items")
//    public List<CartItemListDTO> getCartItems(Principal principal) {
//        String email = principal.getName();
//        log.info("------------------------------");
//        log.info("email : " + email);
//
//        return cartService.getCartItems(email);
//    }
    @GetMapping("/items")
//    public List<CartItemListDTO> getCartItems(@RequestParam String email, Principal principal) {
//        if (principal == null || principal.getName() == null) {
//            log.warn("Principal is null. Checking email query parameter...");
//        }
//        log.info("Fetching cart items for email: {}", email);
//        return cartService.getCartItems(email);
//    }
    public List<CartItemListDTO> getCartItems(@RequestParam(required = false) String email, Principal principal) {
        if (principal != null && principal.getName() != null) {
            email = principal.getName(); // Principal에서 이메일 가져오기
        }

        if (email == null || email.isEmpty()) {
            throw new IllegalArgumentException("Email parameter is required.");
        }

        log.info("Fetching cart items for email: {}", email);
        return cartService.getCartItems(email);
    }

    @PreAuthorize("hasAnyRole('ROLE_USER')")
    @DeleteMapping("/{ciid}")
    public List<CartItemListDTO> removeFromCart(@PathVariable("ciid") Long ciid) {
        log.info("장바구니 품목 번호" + ciid);

        if (ciid == null || ciid <= 0) {
            throw new IllegalArgumentException("유효하지 않은 장바구니 품목 ID입니다: " + ciid);
        }

        return cartService.remove(ciid);
    }
}
