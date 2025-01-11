package com.back4.service.product;

import com.back4.domain.product.Product;
import com.back4.domain.product.ProductImage;
import com.back4.dto.product.ProductDTO;
import com.back4.repository.product.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public List<ProductDTO> getAll() {
        log.info("get All......................");

        return productRepository.findAll().stream()
                .map(this::toProductDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO get(Long pid) {

        java.util.Optional<Product> result = productRepository.selectOne(pid);

        Product product = result.orElseThrow();

        ProductDTO productDTO = toProductDTO(product);

        return productDTO;
    }

    @Override
    public Long register(ProductDTO productDTO) {

        Product product = toProductEntity(productDTO);

        Product result = productRepository.save(product);

        return result.getPid();
    }

    @Override
    public void update(ProductDTO productDTO) {
        Optional<Product> result = productRepository.findById(productDTO.getPid());

        Product product = result.orElseThrow();

        product.changePname(productDTO.getPname());
        product.changePprice(productDTO.getPprice());

        productRepository.save(product);
    }

    @Override
    public void remove(Long pid) {
        productRepository.deleteById(pid);
    }

    private ProductDTO toProductDTO(Product product){
        ProductDTO productDTO = ProductDTO.builder()
                .pid(product.getPid())
                .pname(product.getPname())
                .pprice(product.getPprice())
                .build();

        List<ProductImage> imageList = product.getImageList();

        if(imageList == null || imageList.size() == 0) {
            return productDTO;
        }

        List<String> fileNameList = imageList.stream().map(productImage ->
                productImage.getFileName()).toList();

        productDTO.setUploadFileNames(fileNameList);

        return productDTO;
    }

    private Product toProductEntity(ProductDTO productDTO) {
        Product product = Product.builder()
                .pid(productDTO.getPid())
                .pname(productDTO.getPname())
                .pprice(productDTO.getPprice())
                .build();

        List<String> uploadFileNames = productDTO.getUploadFileNames();

        if(uploadFileNames == null) {
            return product;
        }

        uploadFileNames.stream().forEach(uploadName -> {
            product.addImageString(uploadName);
        });

        return product;
    }
}
