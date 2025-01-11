package com.back4.domain.qna;

import com.back4.domain.member.Member;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.ZoneId;

@Entity
@Table(name = "mealkit_qna_comment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class QnaComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long qcno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "qno", nullable = false)
    private Qna qna; // 댓글이 속한 QnA 게시글

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email", referencedColumnName = "email")
    private Member member; // 댓글 작성자

    @Column(length = 200)
    private String qnaCommentContent; // 댓글 내용

    private boolean modified;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate regDate; // 등록일

    private LocalDate modifiedDate;

    // 댓글 내용 수정 및 수정일자 업데이트
    public void setQnaCommentContent(String content) {
        this.qnaCommentContent = content;
        this.modifiedDate = LocalDate.now(ZoneId.of("Asia/Seoul"));
        this.modified = true; // 수정 여부를 true로 설정
    }
    public String getNickname() {
        return member != null ? member.getNickname() : "Unknown";
    }
}