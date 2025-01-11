package com.back4.repository.member;

import com.back4.domain.member.Member;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {

    //이메일이 일치한다면 즉시 로딩 시켜라
    //attributePathㄴ로 즉시로딩처리를진행할수있다
    @EntityGraph(attributePaths = {"memberRoleList"})
    @Query("select m from Member m where m.email = :email")
    Member getWithRoles(@Param("email") String email);



    /**
     * 이메일 존재 여부 확인
     * //프론트 이메일 중복확인 요청 코드
     */
    boolean existsByEmail(String email);

    /**
     * 닉네임 존재 여부 확인
     * //프론트 이메일 중복확인 요청 코드
     */
    boolean existsByNickname(String nickname);


    /**
     * 패스워드 확인
     * //프론트 패스워드확인 요청 코드
     */
    boolean existsByPassword(String password);

    @Transactional // 트랜잭션 필요
    @Modifying
    @Query("DELETE FROM Member m WHERE m.social = true")
    void deleteAllSocialMembers();



    void deleteByEmail(String email);

    Optional<Member> findByEmail(String email);

}
