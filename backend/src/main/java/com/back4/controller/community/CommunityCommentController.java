package com.back4.controller.community;

import com.back4.dto.PageRequestDTO;
import com.back4.dto.PageResponseDTO;
import com.back4.dto.community.CommunityCommentDTO;
import com.back4.service.community.CommunityCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@Log4j2
@RequestMapping("/api/community/comment")
@RequiredArgsConstructor
public class CommunityCommentController {

    private final CommunityCommentService communityCommentService;

    // 리스트
    @GetMapping("/read/{cno}")
    public CommunityCommentDTO getCommunityComment(@PathVariable("cno") Long cno) {
        return communityCommentService.getCommunityComment(cno); // 하나의 댓글만 조회
    }

    @PreAuthorize("hasAnyRole('USER','ADMIN')")
    @GetMapping("/list/{tno}")
    public PageResponseDTO<CommunityCommentDTO> list(@PathVariable("tno") Long tno, PageRequestDTO pageRequestDTO) {
        log.info("list............." + pageRequestDTO);
        pageRequestDTO.setTno(tno);  // tno를 pageRequestDTO에 설정
        return communityCommentService.getCommunityCommentList(pageRequestDTO);  // tno와 함께 댓글 목록 조회
    }
    // 댓글 추가
    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Long> regComunityComment(@Validated @RequestBody CommunityCommentDTO communityCommentDTO) {
        Map<String, Long> resultMap = new HashMap<>();
        Long cno = communityCommentService.regCommunityComment(communityCommentDTO);
        resultMap.put("cno", cno);
        return resultMap;
    }


    // 댓글 수정
    @PutMapping("/{cno}")
    public ResponseEntity<?> modify(@PathVariable(name = "cno") Long cno, @Validated @RequestBody CommunityCommentDTO communityCommentDTO) {
        try {
            communityCommentDTO.setCno(cno);
            communityCommentService.modify(communityCommentDTO);
            return ResponseEntity.ok(Map.of("RESULT", "SUCCESS"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("ERROR", e.getMessage()));
        }
    }


    // 댓글 삭제
    @DeleteMapping("/{cno}")
    public ResponseEntity<?> remove(@PathVariable(name = "cno") Long cno, @RequestParam String email) {
        try {
            log.info("댓글 삭제: " + cno);
            communityCommentService.remove(cno, email);
            return ResponseEntity.ok(Map.of("RESULT", "SUCCESS"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("ERROR", e.getMessage()));
        }
    }
}
