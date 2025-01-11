package com.back4.domain.mealkit;

import java.util.Arrays;

public enum MealkitCategory {
    KOREAN("한식"),
    JAPANESE("일식"),
    CHINESE("중식"),
    WESTERN("양식"),
    ETC("기타");

    private final String displayName;

    MealkitCategory(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public static MealkitCategory fromDisplayName(String displayName) {
        return Arrays.stream(MealkitCategory.values())
                .filter(category -> category.name().equalsIgnoreCase(displayName))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid category: " + displayName));
    }
}
