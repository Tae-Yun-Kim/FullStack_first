package com.back4.service.community;

import com.back4.dto.PageRequestDTO;
import com.back4.dto.PageResponseDTO;
import com.back4.dto.community.CommunityCommentDTO;

public interface CommunityCommentService {

    // 댓글 등록
    Long regCommunityComment(CommunityCommentDTO communityCommentDTO);

    // 댓글 단일 조회
    CommunityCommentDTO getCommunityComment(Long cno);

    // 댓글 삭제
    void remove(Long cno, String email);

    // 댓글 수정
    void modify(CommunityCommentDTO communityCommentDTO);

    // 댓글 목록 조회 + 페이징 처리
    PageResponseDTO<CommunityCommentDTO> getCommunityCommentList(PageRequestDTO pageRequestDTO);
}
