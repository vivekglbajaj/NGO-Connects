package com.streetlife.ngo_backend.repository;

import com.streetlife.ngo_backend.model.Report;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportRepository extends JpaRepository<Report, Long> {
    List<Report> findByAssignedNgoId(Integer ngoId);

}
