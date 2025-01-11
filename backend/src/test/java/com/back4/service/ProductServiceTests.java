package com.back4.service;

import com.back4.domain.product.Product;
import com.back4.dto.product.ProductDTO;
import com.back4.repository.product.ProductRepository;
import com.back4.service.product.ProductService;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@SpringBootTest
@Log4j2
public class ProductServiceTests {

    @Autowired
    ProductService productService;

    @Autowired
    ProductRepository productRepository;

    @Test
    public void testRegister() {

        ProductDTO productDTO = ProductDTO.builder()
                .pname("테스트 재료")
                .pprice(1000)
                .build();

        productService.register(productDTO);
    }

    @Test
    @Commit
    public void insertDummyProducts() {
        // 요리 재료 리스트 생성
        List<String> products = Arrays.asList(
                "소고기", "돼지고기", "닭고기", "양고기", "오리고기", "마늘", "양파", "파", "고추", "상추",
                "깻잎", "양배추", "브로콜리", "시금치", "당근", "오이", "애호박", "가지", "파프리카", "토마토",
                "감자", "고구마", "콩나물", "숙주나물", "미나리", "샐러리", "케일", "치커리", "로메인", "아루굴라",
                "사과", "배", "바나나", "딸기", "포도", "수박", "참외", "멜론", "복숭아", "자두",
                "귤", "오렌지", "레몬", "라임", "망고", "키위", "블루베리", "라즈베리", "크랜베리", "아보카도",
                "쌀", "밀가루", "보리", "옥수수", "팥", "강낭콩", "완두콩", "검정콩", "두부", "어묵",
                "라면", "우동", "소면", "칼국수", "쌀국수", "잡채", "짜장면", "짬뽕", "냉면", "잔치국수",
                "떡", "떡볶이", "떡국떡", "크림소스", "토마토소스", "간장", "고추장", "된장", "쌈장", "식초",
                "소금", "후추", "설탕", "올리브오일", "참기름", "들기름", "버터", "치즈", "요거트", "우유",
                "베이컨", "소시지", "햄", "갈비", "제육", "불고기", "족발", "보쌈", "스테이크", "닭갈비",
                "홍합", "조개", "새우", "오징어", "문어", "전복", "미역", "다시마", "김", "청국장",
                "계란", "메추리알", "땅콩", "아몬드", "호두", "잣", "캐슈넛", "피스타치오", "해바라기씨", "아보카도오일",
                "참치", "연어", "고등어", "꽁치", "갈치", "명태", "대구", "굴비", "조기", "가자미",
                "탕수육", "깐풍기", "양념치킨", "프라이드치킨", "치킨너겟", "찜닭", "삼계탕", "불닭", "닭강정", "핫도그",
                "김밥", "비빔밥", "볶음밥", "리조또", "파스타", "스파게티", "피자", "햄버거", "샌드위치", "토스트"
        );

        // 각 재료를 Product 엔티티로 저장
        products.forEach(name -> {
            Product product = Product.builder()
                    .pname(name)
                    .pprice((int) (Math.random() * 10000) + 1000) // 1000 ~ 10999 랜덤 가격
                    .build();
            productRepository.save(product);
        });

        System.out.println("200개의 요리 재료가 삽입되었습니다.");
    }

    @Test
    @Commit
    public void insertBasicCookingIngredients() {
        // 기본 요리 재료 리스트 생성
        List<String> basicIngredients = Arrays.asList(
                  "뇨끼", "피자"
        );

        // 각 재료를 Product 엔티티로 저장
        basicIngredients.forEach(name -> {
            Product product = Product.builder()
                    .pname(name)
                    .pprice((int) (Math.random() * 10000) + 1000) // 1000 ~ 10999 랜덤 가격
                    .build();
            productRepository.save(product);
        });

        System.out.println("기본 요리 재료가 데이터베이스에 삽입되었습니다.");
    }
}
