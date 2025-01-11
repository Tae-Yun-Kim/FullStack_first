package com.back4.repository.community;

import com.back4.domain.community.CommunityComment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CommunityCommentRepository extends JpaRepository<CommunityComment, Long> {

    @Query("SELECT r FROM CommunityComment r JOIN FETCH r.community WHERE r.community.tno = :tno")
    Page<CommunityComment> getCommunityCommentList(@Param("tno") Long tno, Pageable pageable);
}