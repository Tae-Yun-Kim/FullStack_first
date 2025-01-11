package com.back4.dto.mealkit;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MealkitDTO {

    private Long mid;

    private String mname;

    private int price;

    private String recipe;

    private String category;

    private List<MealkitProductDTO> products;

    @Builder.Default //서버에 보내지는 실제 파일 데이터의 이름들을 위한 리스트
    private List<MultipartFile> files = new ArrayList<>();

    @Builder.Default //업로드가 완료된 파일의 이름만 문자열로 보관하기 위한 리스트
    private List<String> uploadFileNames = new ArrayList<>();
}
