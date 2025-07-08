package com.streetlife.ngo_backend.service;


import org.springframework.web.multipart.MultipartFile;

public interface ImageStorageService {
    String save(MultipartFile file);
}

