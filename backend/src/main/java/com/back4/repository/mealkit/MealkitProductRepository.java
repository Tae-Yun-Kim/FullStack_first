package com.back4.repository.mealkit;

import com.back4.domain.mealkit.MealkitProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MealkitProductRepository extends JpaRepository<MealkitProduct, Long> {

    // 특정 밀키트에 포함된 모든 재료 가져오기
    @Query("SELECT mp FROM MealkitProduct mp join fetch mp.product WHERE mp.mealkit.mid = :mealkitId")
    List<MealkitProduct> findByMealkitId(@Param("mealkitId") Long mealkitId);

    // 특정 재료를 사용하는 밀키트 목록 가져오기
    @Query("SELECT mp FROM MealkitProduct mp WHERE mp.product.pid = :productId")
    List<MealkitProduct> findByProductId(@Param("productId") Long productId);

    // 밀키트와 재료를 페치 조인으로 가져오기
    @Query("SELECT mp FROM MealkitProduct mp JOIN FETCH mp.mealkit m JOIN FETCH mp.product p WHERE mp.mpid = :mpid")
    MealkitProduct findWithMealkitAndProductById(@Param("mpid") Long mpid);

}
