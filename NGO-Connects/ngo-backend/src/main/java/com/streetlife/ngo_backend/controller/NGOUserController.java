package com.streetlife.ngo_backend.controller;

import com.streetlife.ngo_backend.model.NGOUser;
import com.streetlife.ngo_backend.repository.NGOUserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/ngo")
@CrossOrigin(origins = "${frontend.url}")
public class NGOUserController {

    @Autowired
    private NGOUserRepository ngoUserRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody NGOUser ngo) {
        if (ngoUserRepository.findByEmail(ngo.getEmail()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already exists");
        }
        return ResponseEntity.ok(ngoUserRepository.save(ngo));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginNGO(@RequestBody NGOLoginRequest request) {
        Optional<NGOUser> ngo = ngoUserRepository.findByEmailAndPassword(request.getEmail(), request.getPassword());
        if (ngo.isPresent()) {
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("ngoId", ngo.get().getId());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

    // DTO class for login
    @Data
    public static class NGOLoginRequest {
        private String email;
        private String password;

        public String getEmail() {
            return email;
        }

        public String getPassword() {
            return password;
        }
    }
}
