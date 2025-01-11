package com.back4.dto.community;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class CommunityCommentDTO {

    private Long cno;  // 댓글 ID


    private Long tno;  // 커뮤니티 게시글 번호 (어떤 게시글에 댓글을 다는지)

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    @NotNull
    private String communityCommentContent;

    private String nickname;  // 댓글 작성자

    private String email;

    private boolean modified;


}
