package com.back4.repository.payment;

import com.back4.domain.member.Member;
import com.back4.domain.payment.PaymentHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentHistoryRepository extends JpaRepository<PaymentHistory, Long> {
    List<PaymentHistory> findByMember(Member member); // 회원별 결제 내역 조회

    List<PaymentHistory> findByPayment_Id(Long paymentId); // 특정 결제 ID로 내역 조회
}

