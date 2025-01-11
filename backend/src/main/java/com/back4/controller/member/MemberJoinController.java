package com.back4.controller.member;

import com.back4.domain.member.Member;
import com.back4.dto.member.MemberModifyDTO;
import com.back4.security.filter.JwtCheckerFilter;
import com.back4.service.member.MemberService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api") // 기본 경로: /api/member
@RequiredArgsConstructor // 의존성 주입을 위한 생성자 자동 생성 (final 필드에 대해)
@Slf4j // 로깅 기능 제공
public class MemberJoinController {

    private final AuthenticationManager authenticationManager; // 인증 매니저: Spring Security를 통해 사용자 인증 처리
    private final JwtCheckerFilter jwtCheckerFilter; // JWT 토큰 생성 및 확인 필터
    private final MemberService memberService; // 회원 관련 서비스 로직 처리
    private final PasswordEncoder passwordEncoder;


    // DTO 클래스 정의
    @Getter
    @Setter
    public static class MemberDTO {
        private String email; // 사용자 이메일
        private String password; // 사용자 비밀번호
    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class JwtResponseDTO {
        private String token; // JWT 토큰
    }

    /**
     * 로그인 엔드포인트
     * @param memberDTO 사용자로부터 전달받은 이메일과 비밀번호 정보
     * @return 성공 시 JWT 토큰 반환, 실패 시 에러 메시지 반환
     */
    @PostMapping("/member/login")
    public ResponseEntity<?> login(@RequestBody MemberDTO memberDTO) {
        log.info("로그인 요청: email={}", memberDTO.getEmail());
        try {
            // Spring Security를 통해 사용자 인증 처리
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            memberDTO.getEmail(), // 사용자 이메일
                            memberDTO.getPassword() // 사용자 비밀번호
                    )
            );

            // 인증 성공 후 JWT 토큰 발급
            Member member = memberService.getMemberWithRoles(memberDTO.getEmail()); // 사용자 정보 및 역할 가져오기
            String token = jwtCheckerFilter.createToken(
                    member.getEmail(), // 이메일로 토큰 생성
                    member.getUsername(),
                    member.getRole(), // 사용자의 첫 번째 역할(Role) 추출
                    member.getAdress()

            );

            // 응답 데이터를 Map으로 구성
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("email", member.getEmail());
            response.put("name", member.getUsername());
            response.put("roleNames", member.getRole());

            log.info("로그인 성공: email={}", memberDTO.getEmail());
            return ResponseEntity.ok(response); // Map으로 응답 반환
        } catch (BadCredentialsException e) {
            // 인증 실패 (잘못된 이메일 또는 비밀번호)
            log.warn("잘못된 인증 정보: email={}", memberDTO.getEmail());
            return ResponseEntity.status(401).body("Invalid email or password");
        } catch (AuthenticationException e) {
            // 기타 인증 오류 처리
            log.error("인증 오류: email={}, message={}", memberDTO.getEmail(), e.getMessage());
            return ResponseEntity.status(401).body("Authentication failed");
        }
    }

    /**
     * 회원가입 엔드포인트
     * @param member 회원가입 요청으로 전달받은 사용자 정보 (이메일, 비밀번호, 닉네임 등)
     * @return 회원가입 성공 또는 실패 메시지
     */
    @PostMapping("/member/signup")
    public ResponseEntity<String> register(@RequestBody Member member) {
        log.info("회원가입 요청: email={}, nickname={}", member.getEmail(), member.getNickname());
        try {
            memberService.registerMember(member); // 회원가입 로직 처리
            log.info("회원가입 성공: email={}", member.getEmail());
            return ResponseEntity.ok("회원가입 성공"); // 성공 메시지 반환
        } catch (Exception e) {
            // 회원가입 실패 시 에러 메시지 반환
            log.error("회원가입 실패: email={}, message={}", member.getEmail(), e.getMessage());
            return ResponseEntity.status(400).body("회원가입 실패: " + e.getMessage());
        }
    }

    /**
     * 이메일 중복 확인 API
     * //프론트 이메일 중복확인 요청 코드
     */
    @GetMapping("/check-email")
    public ResponseEntity<Map<String, Boolean>> checkEmailAvailability(@RequestParam("email") String email) {
        boolean isAvailable = memberService.isEmailAvailable(email);
        return ResponseEntity.ok(Map.of("isAvailable", isAvailable));
    }

    /**
     * 닉네임 중복 확인 API
     * //프론트 이메일 중복확인 요청 코드
     */
    @GetMapping("/check-nickname")
    public ResponseEntity<Map<String, Boolean>> checkNicknameAvailability(@RequestParam("nickname") String nickname) {
        boolean isAvailable = memberService.isNicknameAvailable(nickname);
        return ResponseEntity.ok(Map.of("isAvailable", isAvailable));
    }

    /**
     * 접속중인 이메일 확인 API
     * //프론트 이메일 중복확인 요청 코드
     */
    @GetMapping("/member/email")
    public ResponseEntity<String> getCurrentUserEmail() {
        try {
            String email = memberService.getCurrentUserEmail(); // 인증된 사용자 이메일 가져오기
            log.info("JWT에서 추출된 이메일: {}", memberService.getCurrentUserEmail());
            return ResponseEntity.ok(email);
        } catch (Exception e) {

            return ResponseEntity.status(500).body("사용자 정보를 가져오지 못했습니다.");
        }
    }

    /**
     * 회원정보 수정
     *
     * @param memberModifyDTO 회원 수정 데이터
     * @return 수정 결과 또는 오류 메시지
     *
     * 기능:
     * - 회원 정보 수정 로직에 예외 처리를 추가하여 안정성 강화.
     * - HTTP 상태 코드와 응답 메시지를 명확히 관리.
     */
    @PutMapping("/member/modify")
    public ResponseEntity<Map<String, String>> modify(@RequestBody MemberModifyDTO memberModifyDTO) {
        try {
            log.info("Member modify request: {}", memberModifyDTO);

            // 회원 정보 수정 처리
            memberService.modifyMemberSelective(memberModifyDTO);

            return ResponseEntity.ok(Map.of("result", "modified"));
        } catch (Exception e) {
            log.error("Error modifying member: {}", e.getMessage());
            // 예외 발생 시 500 상태 코드와 오류 메시지 반환.
            return ResponseEntity.status(500).body(Map.of("error", "Failed to modify member information."));
        }
    }

    @GetMapping("/member/info")
    public ResponseEntity<?> getMemberInfo(@RequestParam("email") String email) {
        try {
            System.out.println("Received Email: " + email);

            // 데이터베이스에서 사용자 조회
            Member member = memberService.getMemberByEmail(email);
            if (member == null) {
                return ResponseEntity.status(404).body("사용자를 찾을 수 없습니다.");
            }

            // 응답 데이터 생성
            Map<String, Object> memberInfo = new HashMap<>();
            memberInfo.put("email", member.getEmail());
            memberInfo.put("nickname", member.getNickname());
            memberInfo.put("phonenumber", member.getPhonenumber());
            memberInfo.put("adress", member.getAdress());
            memberInfo.put("gender", member.getGender());
            memberInfo.put("birthDate", member.getBirthDate());
            memberInfo.put("username", member.getUsername());

            return ResponseEntity.ok(memberInfo);
        } catch (Exception e) {
            System.err.println("Error retrieving member info: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("회원 정보를 가져오는 데 실패했습니다.");
        }
    }
}






