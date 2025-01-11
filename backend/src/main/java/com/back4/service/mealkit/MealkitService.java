package com.back4.service.mealkit;

import com.back4.dto.mealkit.MealkitDTO;

import java.util.List;

public interface MealkitService {
    Long register(MealkitDTO mealkitDTO);//밀키트 추가
    void update(MealkitDTO mealkitDTO);//밀키트 수정
    void remove(Long mid);//밀키트 삭제
    MealkitDTO get(Long mid);//밀키트 조회
    List<MealkitDTO> getAll();//모든 밀키트 조회
    MealkitDTO getMealkitProduct(Long mid);//밀키트 재료 조회
    //MealkitProduct의 수량 업데이트 및 가격 계산
    void updateProductQuantity(Long mid, int quantity);
}
