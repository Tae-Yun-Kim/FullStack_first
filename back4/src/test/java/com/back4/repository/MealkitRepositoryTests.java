package com.back4.repository;

import com.back4.domain.mealkit.Mealkit;
import com.back4.domain.mealkit.MealkitCategory;
import com.back4.repository.mealkit.MealkitRepository;
import jakarta.transaction.Transactional;
import lombok.extern.log4j.Log4j2;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;

import java.util.Optional;

@SpringBootTest
@Log4j2
public class MealkitRepositoryTests {

    @Autowired
    MealkitRepository mealkitRepository;

    @Test
    public void testAddMealkit() {

        Mealkit mealkit = Mealkit.builder()
                .mname("소세지 야채 볶음")
                .price(0)
                .recipe("소세지와 야채를 함께 볶으세요")
                .category(MealkitCategory.KOREAN)
                .build();

        mealkitRepository.save(mealkit);
    }

    @Test
    @Transactional
    void testFindMealkit() {

        Long mid = 2L;

        Optional<Mealkit> mealkits = mealkitRepository.findById(mid);

        Mealkit mealkit = mealkits.orElseThrow();

        log.info("조회 된 밀키트 : " + mealkit);
    }

    @Test
    void testUpdateMealkit() {
        Long mid = 2L;

        Mealkit mealkit = mealkitRepository.selectOne(mid).get();

        mealkit.changeMname("흑돼지 김치찌개");
        mealkit.changeRecipe("흑돼지를 먼저 볶고 김치를 넣은후 물을 넣어 끓인 후 나머지 재료들을 넣습니다.");

        mealkitRepository.save(mealkit);
    }

    @Commit
    @Transactional
    @Test
    public void testDeleteMealkit() {

        Long mid = 3L;

        mealkitRepository.deleteById(mid);
    }

}
