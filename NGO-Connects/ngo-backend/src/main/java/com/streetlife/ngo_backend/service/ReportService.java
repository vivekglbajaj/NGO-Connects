package com.streetlife.ngo_backend.service;

import com.streetlife.ngo_backend.model.Report;
import com.streetlife.ngo_backend.model.ReportRequest;
import com.streetlife.ngo_backend.repository.ReportRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public Report submitReport(ReportRequest request) {
        Report report = new Report();
        report.setNote(request.getNote());
        report.setImageUrl(request.getImageUrl());
        report.setLatitude(request.getLatitude());
        report.setLongitude(request.getLongitude());
        report.setStatus("Pending");
        report.setTimestamp(LocalDateTime.now());

        return reportRepository.save(report);

    }
    public List<Report> getAllReports() {
        return reportRepository.findAll();
    }
    public Report updateStatus(Long id, String status) {
        Optional<Report> optionalReport = reportRepository.findById(id);
        if (optionalReport.isPresent()) {
            Report report = optionalReport.get();
            report.setStatus(status);
            return reportRepository.save(report);
        } else {
            throw new RuntimeException("Report not found with ID: " + id);
        }
    }
}

