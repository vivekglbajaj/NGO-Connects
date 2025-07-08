package com.streetlife.ngo_backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
public class ImageStorageServiceImpl implements ImageStorageService {

    // 👇 Same as what WebConfig exposes
    private final String baseDir = System.getProperty("user.home") + "/streetlife_uploads";

    public String save(MultipartFile file) {
        String originalFilename = file.getOriginalFilename();     // e.g. 1.jpg
        String timestamp = String.valueOf(System.currentTimeMillis());
        String fileName = timestamp + "_" + originalFilename;     // e.g. 1741504420071_1.jpg
        Path destination = Paths.get("uploads/" + fileName);

        try {
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);
            return fileName;    // ✅ this is returned and used in ReportController
        } catch (IOException e) {
            throw new RuntimeException("Failed to save file", e);
        }
    }


}
