package com.back4.domain.product;

import com.back4.domain.mealkit.MealkitProduct;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "product")
@Getter
@ToString(exclude = "imageList, mealkitProducts")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pid;

    private String pname;

    private int pprice;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
    @Builder.Default
    private List<MealkitProduct> mealkitProducts = new ArrayList<>();

    @ElementCollection
    @Builder.Default
    private List<ProductImage> imageList = new ArrayList<>();

    public void changePname(String pname) {
        this.pname = pname;
    }

    public void changePprice(int pprice) {
        this.pprice = pprice;
    }

    public void addImage(ProductImage image) {

        image.setOrd(this.imageList.size());
        imageList.add(image);
    }

    public void addImageString(String fileName){

        ProductImage productImage = ProductImage.builder()
                .fileName(fileName)
                .build();
        addImage(productImage);

    }

    public void clearList() {
        this.imageList.clear();
    }
}
