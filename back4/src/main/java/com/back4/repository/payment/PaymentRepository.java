package com.back4.repository.payment;

import com.back4.domain.payment.Payment;
import com.back4.domain.payment.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {

    @Query("SELECT p FROM Payment p WHERE p.member.email = :email")
    List<Payment> findByMemberEmail(@Param("email") String email);

    Optional<Payment> findByImpUid(String impUid);

    @Query("SELECT p FROM Payment p WHERE p.impUid = :impUid AND p.member.email = :email")
    Optional<Payment> findByImpUidAndMemberEmail(@Param("impUid") String impUid, @Param("email") String email);

    // 취소 요청 상태인 결제 조회 (관리자용)
    @Query("SELECT p FROM Payment p WHERE p.status = :status")
    List<Payment> findAllByStatus(PaymentStatus status);

    @Query("SELECT p FROM Payment p WHERE p.member.email = :email AND p.status = :status")
    List<Payment> findByMemberEmailAndStatus(@Param("email") String email, @Param("status") PaymentStatus status);

    // 상태 업데이트 (취소 요청 승인/거부 시 사용)
    @Modifying
    @Query("UPDATE Payment p SET p.status = :status WHERE p.impUid = :impUid")
    void updateStatusByImpUid(@Param("status") PaymentStatus status, @Param("impUid") String impUid);
}

