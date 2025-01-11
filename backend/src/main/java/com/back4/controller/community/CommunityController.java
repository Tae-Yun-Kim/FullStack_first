package com.back4.controller.community;

import com.back4.dto.PageRequestDTO;
import com.back4.dto.PageResponseDTO;
import com.back4.dto.community.CommunityDTO;
import com.back4.service.community.CommunityService;
import com.back4.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/api/community")

public class CommunityController {

    private final CustomFileUtil fileUtil;
    private final CommunityService communityService;


    // 게시글 등록: 새 게시글을 등록하고 tno를 반환
    @PostMapping("/register")
    public Map<String, Long> register(
            @RequestPart(value = "files", required = false) List<MultipartFile> files,
            @RequestPart("communityTitle") String communityTitle,
            @RequestPart("communityContent") String communityContent,
            @RequestPart("category") String category,
            @RequestPart("ingredients") String ingredients,
//            @RequestPart("registerDate") String registerDate,
            @RequestPart("email") String email // 이메일 추가
    ) {
        log.info("Register API 호출됨");
        log.info("Files: " + files.size());
        log.info("Title: " + communityTitle);
        log.info("Content: " + communityContent);
        log.info("Category: " + category);
        log.info("Ingredients: " + ingredients);
//        log.info("registerDate: " + registerDate);
        log.info("Email: " + email);  // 이메일 정보 로그 출력


        CommunityDTO communityDTO = CommunityDTO.builder()
                .communityTitle(communityTitle)
                .communityContent(communityContent)
                .category(category)
                .ingredients(ingredients)
//                .registerDate(LocalDate.parse(registerDate))
                .email(email)  // 이메일 설정
                .build();

        // 파일이 없거나 빈 파일 배열일 경우 기본 이미지 경로 설정
        List<String> uploadFileNames;
        if (files == null || files.isEmpty() || files.get(0).getOriginalFilename().equals("empty.jpg")) {
            // 기본 이미지 사용
            uploadFileNames = Collections.singletonList("aaa.jpg"); // 기본 이미지 경로
        } else {
            // 이미지가 있을 경우 업로드 처리
            uploadFileNames = fileUtil.saveFiles(files);
        }

        communityDTO.setUploadFileNames(uploadFileNames);

        Long tno = communityService.register(communityDTO);
        return Map.of("TNO", tno);
    }

    // 게시글 조회: 특정 tno에 해당하는 게시글 정보를 반환
    @GetMapping("/read/{tno}")
    public ResponseEntity<CommunityDTO> getCommunity(@PathVariable Long tno, @RequestParam(required = false) String memberEmail) {
        communityService.increaseViewCount(tno);
        CommunityDTO communityDTO = communityService.getCommunity(tno, memberEmail);
        return ResponseEntity.ok(communityDTO);
    }





    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGET(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }


    // 게시글 목록 조회: 페이징된 게시글 목록을 반환
    @GetMapping("/list")
    public PageResponseDTO<CommunityDTO> list(PageRequestDTO pageRequestDTO) {

        log.info("list............." + pageRequestDTO);
        return communityService.getCommunityList(pageRequestDTO);
    }

    // 게시글 수정: tno에 해당하는 게시글을 수정
    @PutMapping("/{tno}")
    public Map<String, String> modify(
            @PathVariable(name = "tno") Long tno,
            @RequestParam(value = "uploadFileNames[]", required = false) List<String> uploadFileNames, // 기존 이미지 파일명 받기
            @RequestParam Map<String, String> params) {

        // tno에 해당하는 게시글을 수정
        CommunityDTO communityDTO = new CommunityDTO();
        communityDTO.setTno(tno);
        communityDTO.setCommunityTitle(params.get("communityTitle"));
        communityDTO.setCategory(params.get("category"));
        communityDTO.setIngredients(params.get("ingredients"));
        communityDTO.setCommunityContent(params.get("communityContent"));

        // 기존 이미지 파일명 처리
        if (uploadFileNames != null && !uploadFileNames.isEmpty()) {
            communityDTO.setUploadFileNames(uploadFileNames); // 기존 파일명 설정
        }

        log.info("게시글 수정: " + communityDTO);
        communityService.modify(communityDTO); // 서비스 레벨에서 처리

        return Map.of("RESULT", "SUCCESS");
    }

    // 게시글 삭제: tno에 해당하는 게시글을 삭제
    @DeleteMapping("/{tno}")
    public Map<String, String> remove(@PathVariable(name = "tno") Long tno) {
        log.info("게시글 삭제: " + tno);
        communityService.remove(tno);
        return Map.of("RESULT", "SUCCESS");
    }

    // 조회수 증가: 특정 게시글의 조회수를 증가
    @PatchMapping("/{tno}/view")
    public Map<String, String> increaseViewCount(@PathVariable(name = "tno") Long tno) {
        log.info("조회수 증가: " + tno);
        communityService.increaseViewCount(tno);
        return Map.of("RESULT", "VIEW_COUNT_INCREASED");
    }

    // 추천수 증가: 특정 게시글의 추천수를 증가
    @PatchMapping("/{tno}/like")
    public ResponseEntity<Map<String, Object>> toggleLike(
            @PathVariable(name = "tno") Long tno,
            @RequestParam(name = "userEmail") String memberEmail) {
        log.info("좋아요 토글: " + tno + ", 사용자: " + memberEmail);
        boolean liked = communityService.toggleLike(tno, memberEmail);
        CommunityDTO updatedCommunity = communityService.getCommunity(tno, memberEmail);
        Map<String, Object> response = new HashMap<>();
        response.put("liked", liked);
        response.put("likeCount", updatedCommunity.getLikeCount());
        return ResponseEntity.ok(response);
    }

//    @GetMapping("/{tno}/likeCount")
//    public ResponseEntity<Map<String, Object>> getLikeCount(@PathVariable(name = "tno") Long tno) {
//        log.info("좋아요 카운트 조회: " + tno);
//        int likeCount = communityService.getLikeCount(tno); // likeCount 조회 로직
//        Map<String, Object> response = new HashMap<>();
//        response.put("likeCount", likeCount);
//        return ResponseEntity.ok(response);
//    }

    @GetMapping("/categories")
    public List<String> getAllCategories() {
        return communityService.getAllCategories();
    }


}