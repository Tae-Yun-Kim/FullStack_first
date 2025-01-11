package com.back4.dto.member;

import com.back4.domain.member.Gender;
import com.back4.domain.member.MemberRole;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Getter
@Setter
@ToString
public class MemberDTO extends User {

    private String email;
    private String password;
    private String nickname;
    private boolean social;
    private String adress; // 추가된 필드: 주소
    private String phonenumber; // 추가된 필드: 전화번호
    private String username; // 추가된 필드: 이름
    private Gender gender; // 추가된 필드: 성별
    private Date birthDate; // 추가된 필드: 생년월일
    private List<String> roleNames = new ArrayList<>();

    public MemberDTO(
            String email,
            String password,
            String nickname,
            boolean social,
            String adress,
            String phonenumber,
            String username,
            Gender gender,
            Date birthDate,
            List<MemberRole> roles
    ) {
        super(
                email,
                password,
                roles.stream()
                        .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
                        .collect(Collectors.toList())
        );

        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.social = social;
        this.adress = adress;
        this.phonenumber = phonenumber;
        this.username = username;
        this.gender = gender;
        this.birthDate = birthDate;
        this.roleNames = roles.stream().map(Enum::name).collect(Collectors.toList());
    }

    public Map<String, Object> getClaims() {
        return Map.of(
                "email", email,
                "nickname", nickname,
                "social", social,
                "roleNames",roleNames
        );
    }
}

