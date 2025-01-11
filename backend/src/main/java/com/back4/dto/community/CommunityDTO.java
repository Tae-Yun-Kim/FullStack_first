package com.back4.dto.community;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommunityDTO {

    private Long tno; // 식별자 (Primary Key)

    private String communityTitle; // 레시피 제목

    private String communityContent; // 요리 순서 (요리 과정)

    private String category; // 카테고리

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss") // JSON 응답 시 날짜 포맷 지정
    private LocalDateTime updatedAt;

    private String nickname; // 작성자 닉네임

    private String email; // 작성자 이메일

    private int viewCount; // 조회수 필드 추가

    private int likeCount;

    private boolean liked;

    @Builder.Default
    private List<MultipartFile> files = new ArrayList<>(); // 업로드된 파일 데이터 (파일 업로드 시 서버에서 처리)

    @Builder.Default
    private List<String> uploadFileNames = new ArrayList<>(); // 업로드 완료된 파일 이름 목록 (서버에서 처리 후 결과 반환)

    private String ingredients; // 추가된 ingredients 필드

//    private LocalDate registerDate;
}