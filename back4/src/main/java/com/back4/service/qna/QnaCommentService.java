package com.back4.service.qna;

import com.back4.dto.qna.QnaCommentDTO;

import java.util.List;

public interface QnaCommentService {
    QnaCommentDTO addComment(QnaCommentDTO dto); // 댓글 추가

    List<QnaCommentDTO> getCommentsByQna(Long qno); //댓글 조회

    QnaCommentDTO updateComment(Long qcno, QnaCommentDTO dto); //댓글 수정

    void deleteComment(Long qcno); // 댓글 삭제
}