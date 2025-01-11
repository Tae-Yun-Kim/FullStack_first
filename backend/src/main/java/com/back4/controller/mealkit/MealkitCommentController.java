package com.back4.controller.mealkit;

import com.back4.dto.PageRequestDTO;
import com.back4.dto.PageResponseDTO;
import com.back4.dto.mealkit.MealkitCommentDTO;
import com.back4.service.mealkit.MealkitCommentService;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@Log4j2
@RequestMapping("/mealkits/comment")
@RequiredArgsConstructor
public class MealkitCommentController {

    private final MealkitCommentService mealkitCommentService;

    // 단일 댓글 조회
    @GetMapping("/read/{mcno}")
    public MealkitCommentDTO getMealkitComment(@PathVariable("mcno") Long mcno) {
        return mealkitCommentService.getMealkitComment(mcno);
    }

    // 댓글 목록 조회
    @GetMapping("/list/{mid}")
    public PageResponseDTO<MealkitCommentDTO> list(@PathVariable("mid") Long mid, PageRequestDTO pageRequestDTO) {
        log.info("list............." + pageRequestDTO);
        pageRequestDTO.setMid(mid);
        return mealkitCommentService.getMealkitCommentList(pageRequestDTO);
    }

    // 댓글 등록
    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Map<String, Long> regMealkitComment(@Validated @RequestBody MealkitCommentDTO mealkitCommentDTO) {
        Map<String, Long> resultMap = new HashMap<>();
        Long mcno = mealkitCommentService.regMealkitComment(mealkitCommentDTO);
        resultMap.put("mcno", mcno);
        return resultMap;
    }

    // 댓글 수정
    @PutMapping("/{mcno}")
    public ResponseEntity<?> modify(@PathVariable(name = "mcno") Long mcno, @Validated @RequestBody MealkitCommentDTO mealkitCommentDTO) {
        try {
            mealkitCommentDTO.setMcno(mcno);
            mealkitCommentService.modify(mealkitCommentDTO);
            return ResponseEntity.ok(Map.of("RESULT", "SUCCESS"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("ERROR", e.getMessage()));
        }
    }

    // 댓글 삭제
    @DeleteMapping("/{mcno}")
    public ResponseEntity<?> remove(@PathVariable(name = "mcno") Long mcno, @RequestParam String email) {
        try {
            log.info("댓글 삭제: " + mcno);
            mealkitCommentService.remove(mcno, email);
            return ResponseEntity.ok(Map.of("RESULT", "SUCCESS"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("ERROR", e.getMessage()));
        }
    }
}

