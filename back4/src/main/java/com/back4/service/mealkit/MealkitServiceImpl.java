package com.back4.service.mealkit;

import com.back4.domain.mealkit.Mealkit;
import com.back4.domain.mealkit.MealkitCategory;
import com.back4.domain.mealkit.MealkitImage;
import com.back4.domain.mealkit.MealkitProduct;
import com.back4.domain.product.Product;
import com.back4.dto.mealkit.MealkitDTO;
import com.back4.dto.mealkit.MealkitProductDTO;
import com.back4.dto.product.ProductDTO;
import com.back4.repository.mealkit.MealkitProductRepository;
import com.back4.repository.mealkit.MealkitRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
@Transactional
public class MealkitServiceImpl implements MealkitService {

    private final MealkitRepository mealkitRepository;
    private final MealkitProductRepository mealkitProductRepository;

    @Override
//    public List<MealkitDTO> getAll() {
//        log.info("모든 밀키트 가져오기......................");
//
//        // 데이터를 가져올 때 모든 결과를 가져옵니다.
//        List<Object[]> result = mealkitRepository.selectList(); // selectAll 메서드는 MealkitRepository에 구현되어 있어야 함
//
//        // 결과를 MealkitDTO 리스트로 변환
//        List<MealkitDTO> dtoList = result.stream().map(arr -> {
//
//            Mealkit mealkit = (Mealkit) arr[0];
//            MealkitImage mealkitImage = (MealkitImage) arr[1];
//
//            MealkitDTO mealkitDTO = MealkitDTO.builder()
//                    .mid(mealkit.getMid())
//                    .mname(mealkit.getMname())
//                    .recipe(mealkit.getRecipe())
//                    .price(mealkit.getPrice())
//                    .category(String.valueOf(mealkit.getCategory()))
//                    .build();
//
//            String imageStr = mealkitImage.getFileName();
//            mealkitDTO.setUploadFileNames(List.of(imageStr));
//
//            return mealkitDTO;
//        }).collect(Collectors.toList());
//
//        return dtoList;
//    }
    public List<MealkitDTO> getAll() {
        List<Object[]> result = mealkitRepository.selectList();

        // Map to avoid duplicates
        Map<Long, MealkitDTO> mealkitMap = new HashMap<>();

        result.forEach(arr -> {
            Mealkit mealkit = (Mealkit) arr[0];
            MealkitImage mealkitImage = (MealkitImage) arr[1];
            MealkitProduct mealkitProduct = (MealkitProduct) arr[2];
            Product product = (Product) arr[3];

            MealkitDTO mealkitDTO = mealkitMap.getOrDefault(mealkit.getMid(),
                    MealkitDTO.builder()
                            .mid(mealkit.getMid())
                            .mname(mealkit.getMname())
                            .price(mealkit.getPrice())
                            .recipe(mealkit.getRecipe())
                            .category(String.valueOf(mealkit.getCategory()))
                            .uploadFileNames(new ArrayList<>())
                            .products(new ArrayList<>())
                            .build()
            );

            // Merge images
            if (mealkitImage != null) {
                mealkitDTO.getUploadFileNames().add(mealkitImage.getFileName());
            }

            // Merge products
            if (product != null) {
                MealkitProductDTO mealkitProductDTO = MealkitProductDTO.builder()
                        .mpid(mealkitProduct.getMpid())
                        .product(ProductDTO.builder()
                                .pid(product.getPid())
                                .pname(product.getPname())
                                .build())
                        .build();

                if (!mealkitDTO.getProducts().contains(mealkitProductDTO)) {
                    mealkitDTO.getProducts().add(mealkitProductDTO);
                }
            }

            mealkitMap.put(mealkit.getMid(), mealkitDTO);
        });

        return new ArrayList<>(mealkitMap.values());
    }

    @Override
    public MealkitDTO get(Long mid) {

        java.util.Optional<Mealkit> result = mealkitRepository.selectOne(mid);

        Mealkit mealkit = result.orElseThrow();

        MealkitDTO mealkitDTO = toMealkitDTO(mealkit);

        // MealkitProductRepository를 통해 Mealkit에 포함된 Product 데이터 가져오기
        List<MealkitProduct> mealkitProducts = mealkitProductRepository.findByMealkitId(mid);

        // MealkitProduct -> ProductDTO로 변환하여 추가
        List<MealkitProductDTO> productDTOs = mealkitProducts.stream()
                .map(mp -> MealkitProductDTO.builder()
                        .mpid(mp.getMpid())
                        .product(ProductDTO.builder()
                                .pid(mp.getProduct().getPid())
                                .pname(mp.getProduct().getPname())
                                .pprice(mp.getProduct().getPprice())
                                .build())
                        .quantity(mp.getQuantity())
                        .build())
                .collect(Collectors.toList());

        mealkitDTO.setProducts(productDTOs);

        return mealkitDTO;
    }

    @Override
    public Long register(MealkitDTO mealkitDTO) {

        Mealkit mealkit = toMealkitEntity(mealkitDTO);

        Mealkit result = mealkitRepository.save(mealkit);

        return result.getMid();
    }

    @Override
    public void update(MealkitDTO mealkitDTO) {
        Optional<Mealkit> result = mealkitRepository.findById(mealkitDTO.getMid());

        Mealkit mealkit = result.orElseThrow();

        mealkit.changeMname(mealkitDTO.getMname());
        mealkit.changePrice(mealkitDTO.getPrice());
        mealkit.changeRecipe(mealkitDTO.getRecipe());

        mealkit.clearList();

        List<String> uploadFileNames = mealkitDTO.getUploadFileNames();

        if(uploadFileNames != null && uploadFileNames.size() > 0){
            uploadFileNames.stream().forEach(uploadName -> {
                mealkit.addImageString(uploadName);
            });
        }
        mealkitRepository.save(mealkit);
    }

    @Override
    public void remove(Long mid) {
        mealkitRepository.deleteById(mid);
    }

    @Override
    public MealkitDTO getMealkitProduct(Long mid) {
        log.info("밀키트의 기본재료", mid);

        Mealkit mealkit = mealkitRepository.findById(mid)
                .orElseThrow(() -> new IllegalArgumentException("밀키트를 찾을 수 없습니다."+mid));

        List<MealkitProduct> mealkitProducts = mealkitProductRepository.findByMealkitId(mid);

        //MealkitProductDTO 리스트 생성
        List<MealkitProductDTO> productDTOS = mealkitProducts.stream()
                .map(mp -> MealkitProductDTO.builder()
                        .mpid(mp.getMpid())
                        .product(ProductDTO.builder()
                                .pid(mp.getProduct().getPid())
                                .pname(mp.getProduct().getPname())
                                .pprice(mp.getProduct().getPprice())
                                .build())
                        .quantity(mp.getQuantity())
                        .build())
                .collect(Collectors.toList());

        //총 가격계산
        int totalPrice = productDTOS.stream()
                .mapToInt(mp -> mp.getProduct().getPprice() * mp.getQuantity())
                .sum();

        //MealkitDTO 반환
        return MealkitDTO.builder()
                .mid(mealkit.getMid())
                .mname(mealkit.getMname())
                .recipe(mealkit.getRecipe())
                .category(mealkit.getCategory().toString())
                .price(totalPrice)
                .build();
    }

    @Override
    public void updateProductQuantity(Long mid, int quantity) {
        log.info("재료들의 합을 업데이트합니다.", mid);

        //MealkitProduct 조회
        MealkitProduct mealkitProduct = mealkitProductRepository.findById(mid)
                .orElseThrow(() -> new IllegalArgumentException("밀키트 재료를 찾을 수 없습니다."));

        if(quantity < 0) {
            throw new IllegalArgumentException("더이상 차감할 수 없습니다.");
        }

        //수량 업데이트
        mealkitProduct.setQuantity(quantity);
        mealkitProductRepository.save(mealkitProduct);

        //Mealkit 가격 업데이트
        updateMealkitPrice(mealkitProduct.getMealkit().getMid());
    }

    private void updateMealkitPrice(Long mid) {
        log.info("다시 시도합니다.", mid);

        //MealkitProduct 조회
        List<MealkitProduct> mealkitProducts = mealkitProductRepository.findByMealkitId(mid);

        //총 가격 계산
        int totalPrice = mealkitProducts.stream()
                .mapToInt(mp -> mp.getProduct().getPprice() * mp.getQuantity())
                .sum();

        //Mealkit 가격 업데이트
        Mealkit mealkit = mealkitRepository.findById(mid)
                .orElseThrow(() -> new IllegalArgumentException("밀키트를 찾을 수 없습니다."));

        mealkit.changePrice(totalPrice);
        mealkitRepository.save(mealkit);
    }

    private MealkitDTO toMealkitDTO(Mealkit mealkit){
        MealkitDTO mealkitDTO = MealkitDTO.builder()
                .mid(mealkit.getMid())
                .mname(mealkit.getMname())
                .price(mealkit.getPrice())
                .recipe(mealkit.getRecipe())
                .category(String.valueOf(mealkit.getCategory()))
                .build();

        List<MealkitImage> imageList = mealkit.getImageList();

        if(imageList == null || imageList.size() == 0) {
            return mealkitDTO;
        }

        List<String> fileNameList = imageList.stream().map(mealkitImage ->
                mealkitImage.getFileName()).toList();

        mealkitDTO.setUploadFileNames(fileNameList);

        return mealkitDTO;

        }

    private Mealkit toMealkitEntity(MealkitDTO mealkitDTO) {

        MealkitCategory category = MealkitCategory.fromDisplayName(mealkitDTO.getCategory());
        Mealkit mealkit = Mealkit.builder()
                .mname(mealkitDTO.getMname())
                .price(mealkitDTO.getPrice())
                .recipe(mealkitDTO.getRecipe())
                .category(category)
                .build();

        // MealkitProduct 생성 및 매핑
        List<MealkitProductDTO> productDTOs = mealkitDTO.getProducts();
        if (productDTOs != null && !productDTOs.isEmpty()) {
            productDTOs.forEach(productDTO -> {
                Product product = Product.builder().pid(productDTO.getProduct().getPid()).build(); // Product 참조 생성
                mealkit.addProduct(product, productDTO.getQuantity()); // MealkitProduct 생성 및 추가
            });
        }

        List<String> uploadFileNames = mealkitDTO.getUploadFileNames();

        if (uploadFileNames == null) {
            return mealkit;
        }
        uploadFileNames.stream().forEach(uploadName -> {
            mealkit.addImageString(uploadName);
        });

        return mealkit;
    }
}