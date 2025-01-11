package com.back4.domain.community;

import com.back4.domain.BaseEntity;
import com.back4.domain.member.Member;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mealkit_comunity_comment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityComment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cno;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tno", nullable = false)
    private Community community;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email", referencedColumnName = "email")
    private Member member; // 댓글 작성자

    @Column(length = 200)
    private String communityCommentContent; // 댓글 내용

    private boolean modified;


    // 댓글 내용 수정 및 수정일자 업데이트
    public void setCommunityCommentContent(String content) {
        this.communityCommentContent = content;
        this.modified = true; // 수정 여부를 true로 설정
    }
    public String getNickname() {
        return member != null ? member.getNickname() : "Unknown";
    }
}
