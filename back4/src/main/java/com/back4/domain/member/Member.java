package com.back4.domain.member;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;


import java.util.*;

@Entity
@Table(name = "mealkit_member")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString(exclude = "memberRoleList")
public class Member {

    @Id
    private String email; // 회원가입에 쓸 이메일 (소셜로그인 포함)

    private String password; // 비밀번호

    @Column(unique = true)
    private String nickname; // 회원이 사용할 닉네임

    private boolean social; // 소셜 로그인 여부

    private String adress; // 회원의 주소

    private String phonenumber; // 회원의 전화번호

    private String username; // 회원 이름

    @Enumerated(EnumType.STRING)
    private Gender gender; // 성별

    @Temporal(TemporalType.DATE) // 시간 정보 없이 날짜만 저장
    @JsonFormat(pattern = "yyyy-MM-dd") // 날짜 형식 지정
    private Date birthDate; // 생년월일

    private boolean memrole; // 권한 (false: 일반 회원, true: 관리자)

    @ElementCollection(fetch = FetchType.EAGER)
    @Builder.Default
    private List<MemberRole> memberRoleList = new ArrayList<>();


    // 역할 추가 메서드
    public void addRole(MemberRole memberRole) {
        memberRoleList.add(memberRole);
    }

    // 역할 초기화 메서드
    public void clearRole() {
        memberRoleList.clear();
    }

    // memrole 값에 따라 역할 설정
    public void updateRolesBasedOnMemrole() {
        clearRole(); // 기존 역할 초기화
        if (memrole) {
            addRole(MemberRole.ADMIN); // 관리자 역할 추가
        } else {
            addRole(MemberRole.USER); // 일반 사용자 역할 추가
        }
    }

    public String getRole() {
        return memrole ? MemberRole.ADMIN.name() : MemberRole.USER.name();
    }


    // 회원 정보 수정 메서드
    public void changeNickname(String nickname) {
        this.nickname = nickname;
    }

    public void changePassword(String password) {
        this.password = password;
    }

    public void changeSocial(boolean social) {
        this.social = social;
    }

    public void changeUsername(String username) {
        this.username = username;
    }


    public void changeAdress(String adress) {
        this.adress = adress;
    }

    public void changeBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public void changeGender(Gender gender) {
        this.gender = gender;
    }

    public void changePhonenumber(String phonenumber) {
        this.phonenumber = phonenumber;
    }

    public void changeMemrole(boolean memrole) {
        this.memrole = memrole;
        updateRolesBasedOnMemrole(); // memrole 변경 시 역할 업데이트
    }

    public boolean isMemRole() {
        return memrole;
    }

    public void setMemRole(boolean memrole) {
        this.memrole = memrole;
    }


}
