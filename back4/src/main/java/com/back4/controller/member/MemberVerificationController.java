package com.back4.controller.member;

import com.back4.domain.member.Member;
import com.back4.service.member.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class MemberVerificationController {

    private final MemberService memberService;
    private final PasswordEncoder passwordEncoder;

    /**
     * 접속중인 이메일 확인 API
     * //프론트 이메일 중복확인 요청 코드
     */

    @PostMapping("/verify-password")
    public ResponseEntity<Map<String, Object>> verifyPassword(@RequestBody Map<String, String> requestBody) {
        // 클라이언트에서 전달받은 이메일과 비밀번호
        String email = requestBody.get("email");
        String password = requestBody.get("password");

        log.info("비밀번호 검증 요청: email={}, password=*****", email);

        Map<String, Object> response = new HashMap<>();

        try {
            // 데이터베이스에서 사용자 조회
            Member member = memberService.getMemberByEmail(email);
            if (member == null) {
                log.warn("사용자 정보 없음: email={}", email);
                response.put("isValid", false);
                response.put("message", "사용자가 존재하지 않습니다.");
                return ResponseEntity.status(404).body(response);
            }

            // 비밀번호 검증
            boolean isValid = passwordEncoder.matches(password, member.getPassword());
            if (!isValid) {
                log.warn("비밀번호 불일치: email={}", email);
                response.put("isValid", false);
                response.put("message", "비밀번호가 올바르지 않습니다.");
                return ResponseEntity.status(401).body(response);
            }

            // 검증 성공 시
            log.info("비밀번호 검증 성공: email={}", email);
            response.put("isValid", true);
            response.put("redirectUrl", "/mypage/modify"); // 리다이렉트 URL 제공
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("비밀번호 검증 중 오류: email={}, error={}", email, e.getMessage());
            response.put("isValid", false);
            response.put("message", "서버 오류가 발생했습니다.");
            return ResponseEntity.status(500).body(response);
        }
    }
}