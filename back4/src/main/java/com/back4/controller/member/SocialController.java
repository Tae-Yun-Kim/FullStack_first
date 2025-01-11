package com.back4.controller.member;


import com.back4.dto.member.MemberDTO;
import com.back4.service.member.MemberService;
import com.back4.util.JWTUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
public class SocialController {

    private final MemberService memberService;

    /**
     * 소셜 로그인 공통 처리 메서드
     *
     * @param accessToken Access Token
     * @param platform    소셜 플랫폼 이름 (KAKAO, NAVER, GOOGLE)
     * @return ResponseEntity with JWT tokens or error
     * <p>
     * 기능:
     * - 소셜 로그인 로직을 공통 메서드로 분리하여 코드 중복 제거.
     * - JWT 생성 후 응답 데이터에 포함하여 클라이언트로 반환.
     * - 예외 처리 추가로 안정성을 높임.
     */
    private ResponseEntity<Map<String, Object>> processSocialLogin(String accessToken, String platform) {
        try {
            log.info("{} Access Token: {}", platform, accessToken);

            // 소셜 회원 정보 가져오기
            MemberDTO memberDTO = memberService.getSocialMember(accessToken, platform);

            // JWT 생성
            Map<String, Object> claims = memberDTO.getClaims();
            String jwtAccessToken = JWTUtil.generateToken(claims, 10); // 10분
            String jwtRefreshToken = JWTUtil.generateToken(claims, 60 * 24); // 24시간

            // 결과 반환
            Map<String, Object> response = new HashMap<>();
            response.put("AccessToken", jwtAccessToken);
            response.put("RefreshToken", jwtRefreshToken);
            response.put("MemberInfo", memberDTO);

            return ResponseEntity.ok(response);

        } catch (RuntimeException e) {
            log.error("Runtime exception during {} login: {}", platform, e.getMessage());
            return ResponseEntity.status(400).body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            log.error("Unexpected error during {} login: {}", platform, e.getMessage());
            return ResponseEntity.status(500).body(Map.of("error", "An unexpected error occurred."));
        }
    }

    // 카카오 로그인 및 가입 처리
    @GetMapping("/api/member/kakao")
    public ResponseEntity<Map<String, Object>> getMemberFromKakao(@RequestParam String accessToken) {
        // 공통 메서드를 호출하여 처리.
        return processSocialLogin(accessToken, "KAKAO");
    }

    // 네이버 로그인 및 가입 처리
    @GetMapping("/api/member/naver")
    public ResponseEntity<Map<String, Object>> getMemberFromNaver(@RequestParam String accessToken) {
        // 공통 메서드를 호출하여 처리.
        return processSocialLogin(accessToken, "NAVER");
    }

    // 구글 로그인 및 가입 처리
    @GetMapping("/api/member/google")
    public ResponseEntity<Map<String, Object>> getMemberFromGoogle(@RequestParam String accessToken) {
        // 공통 메서드를 호출하여 처리.
        return processSocialLogin(accessToken, "GOOGLE");
    }
}

