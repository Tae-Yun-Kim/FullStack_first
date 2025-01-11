package com.back4.repository.community;

import com.back4.domain.community.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommunityRepository extends JpaRepository<Community, Long> {

    // 특정 게시글을 조회하면서 해당 게시글에 관련된 이미지 목록도 함께 조회
    // @EntityGraph를 사용하여 imageList 필드를 미리 로딩(Eager Fetch)하도록 지정
    @EntityGraph(attributePaths = "imageList")
    @Query("select c from Community c where c.tno = :tno")
    Optional<Community> selectOne(@Param("tno") Long tno);

    // 게시글 목록을 조회하면서, 게시글에 포함된 첫 번째 이미지만을 조회
    // 게시글과 이미지 목록을 left join 하여, 첫 번째 이미지(ord = 0)를 포함한 게시글들을 반환
    @Query("select c, ci from Community c left join c.imageList ci where ci.ord = 0")
    Page<Object[]> selectList(Pageable pageable);

    @Modifying
    @Query("UPDATE Community c SET c.viewCount = c.viewCount + 1 WHERE c.tno = :tno")
    void updateViewCount(@Param("tno") Long tno);

    List<Community> findByCategory(String category);
}
