package com.back4.dto.payment;

import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class PaymentHistoryDTO {
    private String impUid;
    private String merchantUid;
    private int amount;
    private LocalDateTime paymentDate; // 결제 날짜 추가
    private String status;            // 결제 상태 추가
    private String memberEmail;

    // 생성자
    public PaymentHistoryDTO(String impUid, String merchantUid, int amount, LocalDateTime paymentDate, String status, String memberEmail) {
        this.impUid = impUid;
        this.merchantUid = merchantUid;
        this.amount = amount;
        this.paymentDate = paymentDate;
        this.status = status;
        this.memberEmail = memberEmail;
    }

    // Getter와 Setter
    public String getImpUid() {
        return impUid;
    }

    public void setImpUid(String impUid) {
        this.impUid = impUid;
    }

    public String getMerchantUid() {
        return merchantUid;
    }

    public void setMerchantUid(String merchantUid) {
        this.merchantUid = merchantUid;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public String getMemberEmail() {
        return memberEmail;
    }

    public void setMemberEmail(String memberEmail) {
        this.memberEmail = memberEmail;
    }
}