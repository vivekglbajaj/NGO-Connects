package com.streetlife.ngo_backend.repository;

import com.streetlife.ngo_backend.model.NGOUser;
import com.streetlife.ngo_backend.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

// NGOUserRepository.java
public interface NGOUserRepository extends JpaRepository<NGOUser, Integer> {
    Optional<NGOUser> findByEmail(String email);

    Optional<NGOUser> findByEmailAndPassword(String email, String password);
}


