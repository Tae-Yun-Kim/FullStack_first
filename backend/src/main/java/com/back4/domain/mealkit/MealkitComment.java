package com.back4.domain.mealkit;

import com.back4.domain.BaseEntity;
import com.back4.domain.member.Member;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "mealkit_comment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MealkitComment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mcno; // 밀키트 댓글 번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mid", nullable = false)
    private Mealkit mealkit; // 연관된 밀키트

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email", referencedColumnName = "email")
    private Member member; // 댓글 작성자

    @Column(length = 200)
    private String content; // 댓글 내용

    @Column(nullable = false)
    private int rating; // 별점 (1-5)

    private boolean modified; // 수정 여부

    // 댓글 내용 수정 시 수정 여부 업데이트
    public void setContent(String content) {
        this.content = content;
        this.modified = true;
    }

    // 댓글 작성자 닉네임 반환
    public String getNickname() {
        return member != null ? member.getNickname() : "Unknown";
    }
}
