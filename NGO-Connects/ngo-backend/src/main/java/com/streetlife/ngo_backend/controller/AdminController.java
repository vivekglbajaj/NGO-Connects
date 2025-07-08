package com.streetlife.ngo_backend.controller;

import com.streetlife.ngo_backend.model.Admin;
import com.streetlife.ngo_backend.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminRepository adminRepo;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Admin admin) {
        Optional<Admin> existing = adminRepo.findByEmail(admin.getEmail());
        if (existing.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Admin already exists");
        }

        // ✅ Save raw password (no encoding, as per your request)
        adminRepo.save(admin);
        return ResponseEntity.ok("Signup successful");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@RequestBody AdminLoginRequest request) {
        Optional<Admin> optionalAdmin = adminRepo.findByEmail(request.getEmail());

        if (optionalAdmin.isPresent()) {
            Admin admin = optionalAdmin.get();

            // ✅ Raw password comparison (since no encoder used)
            if (request.getPassword().equals(admin.getPassword())) {
                Map<String, Object> response = new HashMap<>();
                response.put("message", "Login successful");
                response.put("admin", true);
                return ResponseEntity.ok(response);
            }
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }

    public static class AdminLoginRequest {
        private String email;
        private String password;
        // getters and setters
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}
