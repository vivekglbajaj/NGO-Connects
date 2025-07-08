package com.streetlife.ngo_backend.controller;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/test")
public class TestController {
    @GetMapping
    public String helloWorld() {
        return "Spring Boot backend is working!";
    }
}
