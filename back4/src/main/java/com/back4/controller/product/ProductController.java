package com.back4.controller.product;

import com.back4.dto.product.ProductDTO;
import com.back4.service.product.ProductService;
import com.back4.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@Log4j2
@RequestMapping("/products")
public class ProductController {

    private final CustomFileUtil fileUtil;
    private final ProductService productService;

    @PostMapping("/")
    public Map<String, Long> register(ProductDTO productDTO) {
        log.info("register: " + productDTO);

        List<MultipartFile> files = productDTO.getFiles();

        List<String> uploadFileNames = fileUtil.saveFiles(files);

        productDTO.setUploadFileNames(uploadFileNames);

        log.info(uploadFileNames);

        Long pid = productService.register(productDTO);
        try{
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return Map.of("result", pid);
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGet(@PathVariable String fileName) {

        return fileUtil.getFile(fileName);
    }

    @GetMapping("/list")
    public List<ProductDTO> list(ProductDTO productDTO) {
        log.info("list------------------------" + productDTO);

        return productService.getAll();
    }

    @PutMapping("/{pid}")
    public Map<String, String> update(@PathVariable(name = "pid") Long pid, ProductDTO productDTO) {
        productDTO.setPid(pid);

        ProductDTO oldProductDTO = productService.get(pid);

        List<String> oldFileNames = oldProductDTO.getUploadFileNames();

        List<MultipartFile> files = productDTO.getFiles();

        List<String> currentUploadFileNames = fileUtil.saveFiles(files);

        List<String> uploadedFileNames = productDTO.getUploadFileNames();

        if(currentUploadFileNames != null && currentUploadFileNames.size() > 0) {
            uploadedFileNames.addAll(currentUploadFileNames);
        }
        productService.update(productDTO);

        if(oldFileNames != null && oldFileNames.size() > 0) {

            List<String> removeFiles = oldFileNames
                    .stream()
                    .filter(fileName -> uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());

            fileUtil.deleteFiles(removeFiles);
        }
        return Map.of("RESULT", "SUCCESS");
    }

    @DeleteMapping("/{pid}")
    public Map<String, String> remove(@PathVariable("pid") Long pid) {
        //삭제해야할 파일들 알아내기
        List<String> oldFileNames =  productService.get(pid).getUploadFileNames();
        productService.remove(pid);
        fileUtil.deleteFiles(oldFileNames);
        return Map.of("RESULT", "SUCCESS");
    }
}
