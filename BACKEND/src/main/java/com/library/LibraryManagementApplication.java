package com.library;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@ComponentScan(basePackages = {
    "com.library.async", 
    "com.library.config", 
    "com.library.constant", 
    "com.library.controller",
    "com.library.dto", 
    "com.library.entity", 
    "com.library.event", 
    "com.library.exception",
    "com.library.filter", 
    "com.library.interceptor", 
    "com.library.repository",
    "com.library.scheduler", 
    "com.library.security", 
    "com.library.service", 
    "com.library.util", 
    "com.library.validation"
})
@EnableScheduling
@EnableAsync
@EnableJpaAuditing
public class LibraryManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibraryManagementApplication.class, args);
    }
}