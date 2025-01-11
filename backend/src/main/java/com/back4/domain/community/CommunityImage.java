package com.back4.domain.community;

import jakarta.persistence.Embeddable;
import lombok.*;

@Embeddable
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommunityImage {

    private String fileName;

    private int ord;

    public void setOrd(int ord){
        this.ord = ord;
    }

}
