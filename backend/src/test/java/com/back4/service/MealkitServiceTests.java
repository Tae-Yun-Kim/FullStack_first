package com.back4.service;

import com.back4.domain.mealkit.MealkitCategory;
import com.back4.dto.mealkit.MealkitDTO;
import com.back4.service.mealkit.MealkitService;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@Log4j2
public class MealkitServiceTests {

    @Autowired
    MealkitService mealkitService;

    @Test
    public void testRegister() {
        MealkitDTO mealkitDTO = MealkitDTO.builder()
                .mname("테스트밀키트")
                .price(1000)
                .recipe("테스트 밀키트의 레시피 입니다")
                .category(String.valueOf(MealkitCategory.KOREAN))
                .build();

        mealkitService.register(mealkitDTO);
    }
}
