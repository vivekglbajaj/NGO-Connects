package com.streetlife.ngo_backend.repository;

import com.streetlife.ngo_backend.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepository extends JpaRepository<Admin, Long> {
    Optional<Admin> findByEmail(String email);

    Optional<Admin> findByEmailAndPassword(String email, String password);
}

