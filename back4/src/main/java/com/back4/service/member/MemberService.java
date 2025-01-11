package com.back4.service.member;

import com.back4.domain.member.Member;
import com.back4.dto.member.MemberDTO;
import com.back4.dto.member.MemberModifyDTO;

public interface MemberService {
    // 회원가입 로직
    Member registerMember(Member member);

    // 소셜 계정 기반 회원가입 로직
    Member registerSocialMember(String email, String nickname);

    // 특정 이메일의 회원 정보 조회
    Member getMemberWithRoles(String email);

    // 소셜 로그인 및 가입 처리
    MemberDTO getSocialMember(String accessToken, String provider);

    //프론트 이메일 중복확인 요청 코드
    boolean isEmailAvailable(String email);

    //프론트 닉네임 중복확인 요청 코드
    boolean isNicknameAvailable(String nickname);

    //프론트  비밀번호 중복확인 요청 코드
    boolean isPasswordAvailable(String password);

    // 현재 로그인한 사용자 이메일 가져오기
    String getCurrentUserEmail();

    Member getMemberByEmail(String email);

    void modifyMemberSelective(MemberModifyDTO memberModifyDTO);

}

