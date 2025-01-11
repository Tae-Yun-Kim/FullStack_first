package com.back4.domain.mealkit;

import com.back4.domain.product.Product;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "mealkit")
@Getter
@ToString(exclude = "imageList")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Mealkit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mid;

    private String mname;

    private int price;

    private String recipe;

    @Enumerated(EnumType.STRING)
    private MealkitCategory category;

    @OneToMany(mappedBy = "mealkit", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<MealkitProduct> mealkitProducts = new ArrayList<>();

    @ElementCollection //엔터티의 값 타입 컬렉션을 저장할 때 사용
    @Builder.Default //매핑 관계를 맺지않고 단순한 타입으로 처리
    private List<MealkitImage> imageList = new ArrayList<>();

    public void changePrice(int price){
        this.price = price;
    }

    public void changeRecipe(String recipe){
        this.recipe = recipe;
    }

    public void changeMname(String mname){
        this.mname = mname;
    }

    public void addImage(MealkitImage image) {
        image.setOrd(this.imageList.size());
        imageList.add(image);
    }

    public void addImageString(String fileName) {
        MealkitImage mealkitImage = MealkitImage.builder()
                .fileName(fileName)
                .build();
        addImage(mealkitImage);
    }

    public void clearList() {
        this.imageList.clear();
    }

    public void addProduct(Product product, int quantity) {
        if (product == null) {
            throw new IllegalArgumentException("Product cannot be null");
        }

        MealkitProduct mealkitProduct = MealkitProduct.builder()
                .mealkit(this)
                .product(product)
                .quantity(quantity)
                .build();
        mealkitProducts.add(mealkitProduct);
    }
    // 기본 재료 제거
    public void removeProduct(Product product) {
        mealkitProducts.removeIf(mp -> mp.getProduct().equals(product));
    }


}
