package com.back4.repository.product;

import com.back4.domain.product.Product;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("select p from Product p where p.pid = :pid")
    Optional<Product> selectOne(@Param("pid") Long pid);

    @EntityGraph(attributePaths = {"mealkitProducts"}) // 명시적으로 연관 필드를 로드
    List<Product> findAll();

    @Query("SELECT p FROM Product p WHERE p.pname = :name")
    List<Product> findByName(@Param("name") String name);
}

