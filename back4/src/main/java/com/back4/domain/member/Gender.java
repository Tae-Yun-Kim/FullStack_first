package com.back4.domain.member;

public enum Gender {
    MALE, FEMALE,NULL;

    public static Gender fromString(String value) {
        try {
            return Gender.valueOf(value.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid gender value: " + value);
        }
    }
}
