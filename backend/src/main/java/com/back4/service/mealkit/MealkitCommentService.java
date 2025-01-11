package com.back4.service.mealkit;

import com.back4.dto.PageRequestDTO;
import com.back4.dto.PageResponseDTO;
import com.back4.dto.mealkit.MealkitCommentDTO;

public interface MealkitCommentService {

    // 댓글 등록
    Long regMealkitComment(MealkitCommentDTO mealkitCommentDTO);

    // 단일 댓글 조회
    MealkitCommentDTO getMealkitComment(Long mcno);

    // 댓글 삭제
    void remove(Long mcno, String email);

    // 댓글 수정
    void modify(MealkitCommentDTO mealkitCommentDTO);

    // 댓글 목록 조회 (페이징 처리)
    PageResponseDTO<MealkitCommentDTO> getMealkitCommentList(PageRequestDTO pageRequestDTO);
}
