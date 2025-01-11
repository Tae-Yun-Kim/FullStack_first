package com.back4.repository.mealkit;

import com.back4.domain.mealkit.Mealkit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface MealkitRepository extends JpaRepository<Mealkit, Long> {

//    @Query("select m, mi  from Mealkit m left join m.imageList mi  where mi.ord = 0 ")
@Query("SELECT m, mi, mp, p " +
        "FROM Mealkit m " +
        "LEFT JOIN m.imageList mi " +
        "LEFT JOIN m.mealkitProducts mp " +
        "LEFT JOIN mp.product p")
    List<Object[]> selectList();

    @Query("select m from Mealkit m where m.mid = :mid")
    Optional<Mealkit> selectOne(@Param("mid") Long mid);

    @Query("SELECT m FROM Mealkit m WHERE m.category = :category")
    List<Mealkit> findByCategory(@Param("category") String category);

    @Query("SELECT m FROM Mealkit m JOIN FETCH m.mealkitProducts mp JOIN FETCH mp.product WHERE m.mid = :id")
    Mealkit findWithProductsById(@Param("id") Long id);

    @Query("SELECT m FROM Mealkit m LEFT JOIN FETCH m.mealkitProducts mp LEFT JOIN FETCH mp.product")
    List<Mealkit> findAllWithProducts();
}
