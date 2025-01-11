package com.back4.controller.mealkit;

import com.back4.domain.mealkit.Mealkit;
import com.back4.dto.mealkit.MealkitDTO;
import com.back4.repository.mealkit.MealkitRepository;
import com.back4.service.mealkit.MealkitService;
import com.back4.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/mealkits")
public class MealkitController {

    private final CustomFileUtil fileUtil;
    private final MealkitService mealkitService;
    private final MealkitRepository mealkitRepository;

    @PostMapping("/")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public Map<String, Long> register(
            @RequestPart("mealkit") MealkitDTO mealkitDTO, // JSON 데이터
            @RequestPart(value = "files", required = false) List<MultipartFile> files // 파일 데이터
    ) {
        log.info("register : " + mealkitDTO);

        // 파일 저장 처리
        if (files != null && !files.isEmpty()) {
            List<String> uploadFileNames = fileUtil.saveFiles(files);
            mealkitDTO.setUploadFileNames(uploadFileNames);
            log.info("Uploaded files: " + uploadFileNames);
        }

        // 밀키트 등록 처리
        Long mid = mealkitService.register(mealkitDTO);

        return Map.of("result", mid);
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGet(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }
    @GetMapping("/list")
    public List<MealkitDTO> list(MealkitDTO mealkitDTO) {
        log.info("list--------------------------------"+ mealkitDTO);

        return mealkitService.getAll();
    }

    @GetMapping
    public List<Mealkit> getAllMealkitsWithProducts() {
        return mealkitRepository.findAllWithProducts();
    }

    @GetMapping("/{mid}")
    public MealkitDTO read(@PathVariable(name = "mid") Long mid) {
        return mealkitService.get(mid);
    }

    @PutMapping("/{mid}")
    public Map<String, String> update(@PathVariable(name = "mid") Long mid, MealkitDTO mealkitDTO) {
        mealkitDTO.setMid(mid);

        MealkitDTO oldMealkitDTO = mealkitService.get(mid);

        List<String> oldFileNames = oldMealkitDTO.getUploadFileNames();

        List<MultipartFile> files = mealkitDTO.getFiles();

        List<String> currentUploadFileNames = fileUtil.saveFiles(files);

        List<String> uploadFileNames = mealkitDTO.getUploadFileNames();

        if(currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
            uploadFileNames.addAll(currentUploadFileNames);
        }

        mealkitService.update(mealkitDTO);

        if(oldFileNames != null && oldFileNames.size() > 0) {

            List<String> removeFiles = oldFileNames
                    .stream()
                    .filter(fileName -> uploadFileNames.indexOf(fileName) == -1).collect(Collectors.toList());

            fileUtil.deleteFiles(removeFiles);
        }
        return Map.of("RESULT", "SUCCESS");
    }

    @DeleteMapping("/{mid}")
    public Map<String, String> remove(@PathVariable("mid") Long mid) {
        List<String> oldFileNames = mealkitService.get(mid).getUploadFileNames();
        mealkitService.remove(mid);
        fileUtil.deleteFiles(oldFileNames);
        return Map.of("RESULT", "SUCCESS");
    }



//     특정 재료 수량 조정
    @PutMapping("/products/{mpid}/quantity")
    public ResponseEntity<String> updateProductQuantity(
            @PathVariable Long mpid,
            @RequestParam int quantity) {
        log.info("재료개수를 업데이트 합니다. : {}", mpid);
        mealkitService.updateProductQuantity(mpid, quantity);
        return ResponseEntity.ok("개수를 업데이트하고 가격을 다시 계산합니다.");
    }

}
