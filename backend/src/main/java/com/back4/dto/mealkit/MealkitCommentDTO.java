package com.back4.dto.mealkit;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MealkitCommentDTO {

    private Long mcno; // 밀키트 댓글 번호
    private Long mid; // 밀키트 ID

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt; // 생성 시간

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt; // 수정 시간

    @NotNull
    private String content; // 댓글 내용

    private String nickname; // 작성자 닉네임
    private String email; // 작성자 이메일
    private boolean modified; // 수정 여부
    private int rating; // 별점 (1-5)
}
