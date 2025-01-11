package com.back4.dto.member;

import com.back4.domain.member.Gender;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class MemberModifyDTO {

    private String email;
    private String password;
    private String nickname;
    private boolean social;
    private String adress; // 추가된 필드: 주소
    private String phonenumber; // 추가된 필드: 전화번호
    private String username; // 추가된 필드: 이름
    private Date birthDate;
    private Gender gender; // 성별

}
