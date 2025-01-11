package com.back4;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class Back4Application {

    public static void main(String[] args) {
        SpringApplication.run(Back4Application.class, args);
    }

}
