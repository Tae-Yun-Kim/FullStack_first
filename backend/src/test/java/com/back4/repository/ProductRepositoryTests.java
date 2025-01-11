package com.back4.repository;

import com.back4.domain.product.Product;
import com.back4.repository.product.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
@Log4j2
public class ProductRepositoryTests {

    @Autowired
    private ProductRepository productRepository;

    @Test
    void testAddProduct() {
        Product product = Product.builder()
                .pname("양파")
                .pprice(2000)
                .build();

        Product product2 = Product.builder()
                .pname("파프리카")
                .pprice(2000)
                .build();

        Product product3 = Product.builder()
                .pname("마늘")
                .pprice(1000)
                .build();

        productRepository.save(product);
        productRepository.save(product2);
        productRepository.save(product3);
    }

    @Test
    @Transactional
    void testFindProduct() {
        Long pid = 3L;

        Optional<Product> result = productRepository.findById(pid);

        Product product = result.orElseThrow();

        log.info("조회 된 재료" + product);
    }

    @Test
    @Transactional
    public void testUpdate() {
        Long pid = 1L;

        Product product = productRepository.selectOne(pid).get();

        product.changePname("포기 김치");
        product.changePprice(6000);

        productRepository.save(product);

    }

    @Test
    @Transactional
    public void testDelete() {
        Long pid = 3L;

        productRepository.deleteById(3L);
    }
}
