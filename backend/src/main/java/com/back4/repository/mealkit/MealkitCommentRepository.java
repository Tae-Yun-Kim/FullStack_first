package com.back4.repository.mealkit;

import com.back4.domain.mealkit.MealkitComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface MealkitCommentRepository extends JpaRepository<MealkitComment, Long> {

    @Query("SELECT mc FROM MealkitComment mc JOIN FETCH mc.mealkit WHERE mc.mealkit.mid = :mid")
    Page<MealkitComment> getMealkitCommentList(@Param("mid") Long mid, Pageable pageable);
}