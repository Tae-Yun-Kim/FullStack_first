package com.back4.service.member;

import com.back4.domain.member.Member;
import com.back4.domain.member.MemberRole;
import com.back4.dto.member.MemberDTO;
import com.back4.dto.member.MemberModifyDTO;
import com.back4.repository.member.MemberRepository;
import com.back4.util.InvalidNicknameException;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Log4j2
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    //프론트 이메일 중복확인 요청 코드
    @Override
    public boolean isEmailAvailable(String email) {
        return !memberRepository.existsByEmail(email);
    }

    //프론트 닉네임 중복화깅 요청코드
    @Override
    public boolean isNicknameAvailable(String nickname) {
        return !memberRepository.existsByNickname(nickname);
    }
    //프론트 비밀번호 확인 요청 코드
    @Override
    public boolean isPasswordAvailable(String password) {
        return !memberRepository.existsByPassword(password);
    }

    @Override
    public Member registerMember(Member member) {
        // 닉네임 유효성 검증
        if (member.getNickname() == null || member.getNickname().isBlank()) {
            log.error("닉네임이 입력되지 않았습니다.");
            throw new InvalidNicknameException("닉네임을 입력해주세요.");
        }

        //백엔드 내부 이메일 중복 체크
        if (memberRepository.existsByEmail(member.getEmail())) {
            log.error("이미 존재하는 계정입니다: {}", member.getEmail());
            throw new IllegalStateException("이미 사용 중인 이메일입니다.");
        }

        //백엔드 내부 닉네임 중복 체크
        if (memberRepository.existsByNickname(member.getNickname())) {
            log.error("이미 존재하는 닉네임입니다: {}", member.getNickname());
            throw new IllegalStateException("이미 사용 중인 닉네임입니다.");
        }

        //백엔드 내부 이메일 중복 체크
        if (memberRepository.existsByPassword(member.getPassword())) {
            log.error("패스워드 확인: {}", member.getPassword());
            throw new IllegalStateException("패스워드확인.");
        }


        // 비밀번호 암호화
        if (member.getPassword() == null || member.getPassword().isBlank()) {
            throw new IllegalArgumentException("비밀번호를 입력해주세요.");
        }
        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(member.getPassword());
        member.changePassword(passwordEncoder.encode(member.getPassword()));


        // 기본 역할 부여
        member.addRole(MemberRole.USER);

        // ADMIN 권한 부여 조건 예제 (특정 이메일만)
        if ("admin@admin.com".equals(member.getEmail())) {
            member.addRole(MemberRole.ADMIN);
        }

        // 저장
        return memberRepository.save(member);
    }

    @Override
    public Member registerSocialMember(String email, String nickname) {
        Optional<Member> existingMember = memberRepository.findById(email);
        if (existingMember.isPresent()) {
            return existingMember.get();
        }

        // 닉네임이 null 또는 비어 있으면 자동 생성
        String baseNickname = (nickname == null || nickname.isBlank())
                ? generateSocialPrefix(email) + "_user"
                : nickname;

        // 중복되지 않는 닉네임 생성
        String uniqueNickname = generateUniqueNickname(baseNickname);

        // 새로운 소셜 회원 생성
        Member socialMember = Member.builder()
                .email(email)
                .nickname(uniqueNickname)
                .password(passwordEncoder.encode("SOCIAL_USER"))
                .social(true)
                .build();

        socialMember.addRole(MemberRole.USER);
        return memberRepository.save(socialMember);
    }

    private String generateSocialPrefix(String email) {
        if (email.contains("@")) {
            return email.substring(email.indexOf("@") + 1, email.lastIndexOf("."));
        }
        return "user";
    }

    private String generateUniqueNickname(String baseNickname) {
        String uniqueNickname = baseNickname;
        int attempt = 0;

        // 닉네임 중복 확인 및 고유 닉네임 생성
        while (memberRepository.existsByNickname(uniqueNickname)) {
            uniqueNickname = baseNickname + "_" + (++attempt);
        }

        return uniqueNickname;
    }

    @Override
    public MemberDTO getSocialMember(String accessToken, String provider) {
        String email = fetchSocialEmail(accessToken, provider);

        Optional<Member> existingMember = memberRepository.findById(email);
        if (existingMember.isPresent()) {
            return entityToDTO(existingMember.get());
        }

        // 새로운 소셜 회원 생성
        Member newSocialMember = Member.builder()
                .email(email)
                .nickname(provider + "_user")
                .password(passwordEncoder.encode("SOCIAL_USER")) // 소셜 계정은 임의의 비밀번호 설정
                .social(true)
                .build();

        newSocialMember.addRole(MemberRole.USER);
        memberRepository.save(newSocialMember);

        return entityToDTO(newSocialMember);
    }

    @Override
//    public void modifyMember(MemberModifyDTO memberModifyDTO) {
//        Member member = memberRepository.findById(memberModifyDTO.getEmail())
//                .orElseThrow(() -> new IllegalArgumentException("Member not found"));
//
//        member.changeNickname(memberModifyDTO.getNickname());
//        member.changePassword(passwordEncoder.encode(memberModifyDTO.getPassword()));
//
//        //1220 이진수데이터베이스삽입 추가 - 새로운 필드 수정 로직 추가
//        member.changeAdress(memberModifyDTO.getAdress());
//        member.changePhonenumber(memberModifyDTO.getPhonenumber());
//
//
//        memberRepository.save(member); //1220 이진수데이터베이스삽입 추가
//    }
    public void modifyMemberSelective(MemberModifyDTO memberModifyDTO) {
        Member member = memberRepository.findById(memberModifyDTO.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Member not found"));

        // 수정할 값이 있는 경우에만 업데이트
        if (memberModifyDTO.getNickname() != null) {
            member.changeNickname(memberModifyDTO.getNickname());
        }
        if (memberModifyDTO.getPassword() != null) {
            member.changePassword(passwordEncoder.encode(memberModifyDTO.getPassword()));
        }
        if (memberModifyDTO.getAdress() != null) {
            member.changeAdress(memberModifyDTO.getAdress());
        }
        if (memberModifyDTO.getPhonenumber() != null) {
            member.changePhonenumber(memberModifyDTO.getPhonenumber());
        }
        if (memberModifyDTO.getUsername() != null) {
            member.changeUsername(memberModifyDTO.getUsername());
        }
        if (memberModifyDTO.getBirthDate() != null) {
            member.changeBirthDate(memberModifyDTO.getBirthDate());
        }
        if (memberModifyDTO.getGender() != null) {
            member.changeGender(memberModifyDTO.getGender());
        }

        // 변경된 데이터 저장
        memberRepository.save(member);
    }

    @Override
    public Member getMemberWithRoles(String email) {
        Member member = memberRepository.getWithRoles(email);
        if (member == null) {
            throw new IllegalArgumentException("회원 정보를 찾을 수 없습니다: " + email);
        }
        return member;
    }

    @Override
    public Member getMemberByEmail(String email) {
        // 이메일로 데이터베이스에서 사용자 검색
        return memberRepository.findById(email)
                .orElseThrow(() -> new IllegalArgumentException("해당 이메일의 사용자를 찾을 수 없습니다: " + email));
    }

    private String fetchSocialEmail(String accessToken, String provider) {
        String apiUrl;

        switch (provider.toUpperCase()) {
            case "KAKAO":
                apiUrl = "https://kapi.kakao.com/v2/user/me";
                break;
            case "NAVER":
                apiUrl = "https://openapi.naver.com/v1/nid/me";
                break;
            case "GOOGLE":
                apiUrl = "https://www.googleapis.com/oauth2/v3/userinfo";
                break;
            default:
                throw new IllegalArgumentException("Unsupported provider: " + provider);
        }

        RestTemplate restTemplate = new RestTemplate();
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", "Bearer " + accessToken);
            HttpEntity<String> entity = new HttpEntity<>(headers);

            ResponseEntity<Map> response = restTemplate.exchange(apiUrl, HttpMethod.GET, entity, Map.class);
            Map<String, Object> responseBody = response.getBody();

            if ("KAKAO".equals(provider.toUpperCase())) {
                Map<String, Object> kakaoAccount = (Map<String, Object>) responseBody.get("kakao_account");
                return (String) kakaoAccount.get("email");
            } else if ("NAVER".equals(provider.toUpperCase())) {
                Map<String, Object> naverResponse = (Map<String, Object>) responseBody.get("response");
                return (String) naverResponse.get("email");
            } else if ("GOOGLE".equals(provider.toUpperCase())) {
                return (String) responseBody.get("email");
            } else {
                throw new IllegalArgumentException("Unexpected provider: " + provider);
            }
        } catch (HttpClientErrorException e) {
            log.error("HTTP error for provider {}: status={}, response={} ", provider, e.getStatusCode(), e.getResponseBodyAsString());
            throw new RuntimeException("Unauthorized access. Check IP settings in the provider console.");
        } catch (Exception e) {
            log.error("Error fetching email from provider {}: {}", provider, e.getMessage(), e);
            throw new RuntimeException("Failed to fetch social email from " + provider, e);
        }
    }

    private MemberDTO entityToDTO(Member member) {
        return new MemberDTO(
                member.getEmail(),
                member.getPassword(),
                member.getNickname(),
                member.isSocial(),
                member.getAdress(), //1220 이진수데이터베이스삽입 추가
                member.getPhonenumber(), //1220 이진수데이터베이스삽입 추가
                member.getUsername(), //1220 이진수데이터베이스삽입 추가
                member.getGender(), //1220 이진수데이터베이스삽입 추가
                member.getBirthDate(), //1220 이진수데이터베이스삽입 추가
                member.getMemberRoleList()
        );
    }
    @Override
    public String getCurrentUserEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("사용자가 인증되지 않았습니다.");
        }
        return authentication.getName(); // 인증된 사용자의 이메일 반환
    }

}

