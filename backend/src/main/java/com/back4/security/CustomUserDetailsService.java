package com.back4.security;

import com.back4.domain.member.Member;
import com.back4.repository.member.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        // getWithRoles 메서드를 사용해 회원 정보와 역할을 한 번에 로드
        Member member = memberRepository.getWithRoles(email);
        if (member == null) {
            throw new UsernameNotFoundException("회원 정보를 찾을 수 없습니다.");
        }

        // UserDetails 객체 생성
        return User.builder()
                .username(member.getEmail())
                .password(member.getPassword())
                .roles(member.getMemberRoleList().stream()
                        .map(Enum::name) // Enum 이름(ADMIN, USER 등)을 ROLE로 변환
                        .toArray(String[]::new)) // String[] 형태로 변환
                .build();
    }
}
