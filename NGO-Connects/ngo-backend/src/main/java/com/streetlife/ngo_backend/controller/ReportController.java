package com.streetlife.ngo_backend.controller;

import com.streetlife.ngo_backend.model.Report;
import com.streetlife.ngo_backend.model.NGOUser;
import com.streetlife.ngo_backend.repository.NGOUserRepository;
import com.streetlife.ngo_backend.repository.ReportRepository;
import com.streetlife.ngo_backend.service.ImageStorageService;
import com.streetlife.ngo_backend.service.ReportService;
import com.streetlife.ngo_backend.service.EmailService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin(origins = "${frontend.url}")
@RestController
@RequestMapping("/api/report")
public class ReportController {

    private final ReportService reportService;
    private final ImageStorageService imageStorageService;
    private final ReportRepository reportRepository;
    private final NGOUserRepository ngoUserRepository;
    private final EmailService emailService;

    @Autowired
    public ReportController(ReportService reportService,
                            ImageStorageService imageStorageService,
                            ReportRepository reportRepository,
                            NGOUserRepository ngoUserRepository,
                            EmailService emailService) {
        this.reportService = reportService;
        this.imageStorageService = imageStorageService;
        this.reportRepository = reportRepository;
        this.ngoUserRepository = ngoUserRepository;
        this.emailService = emailService;
    }

    // ✅ Submit new report
    @PostMapping
    public ResponseEntity<?> submitReport(
            @RequestParam("name") String name,
            @RequestParam("age") int age,
            @RequestParam("address") String address,
            @RequestParam("note") String note,
            @RequestParam("latitude") double latitude,
            @RequestParam("longitude") double longitude,
            @RequestParam("file") MultipartFile file
    ) {
        try {
            System.out.println("📥 Report received from: " + name);
            System.out.println("📸 File: " + file.getOriginalFilename() + ", Size: " + file.getSize());

            // Save image to uploads/ folder
            String filename = imageStorageService.save(file);
            String imageUrl = "/images/" + filename;

            // Find nearest NGO
            List<NGOUser> ngos = ngoUserRepository.findAll();
            NGOUser nearestNGO = null;
            double minDistance = Double.MAX_VALUE;

            for (NGOUser ngo : ngos) {
                double dist = haversine(latitude, longitude, ngo.getLatitude(), ngo.getLongitude());
                if (dist < minDistance) {
                    minDistance = dist;
                    nearestNGO = ngo;
                }
            }

            // Create report
            Report report = new Report();
            report.setName(name);
            report.setAge(age);
            report.setAddress(address);
            report.setNote(note);
            report.setLatitude(latitude);
            report.setLongitude(longitude);
            report.setImageUrl(imageUrl);
            report.setStatus("Assigned");
            report.setTimestamp(LocalDateTime.now());

            if (nearestNGO != null) {
                report.setAssignedNgoId(nearestNGO.getId());

                // Send email
                try {
                    emailService.sendAssignmentEmail(
                            nearestNGO.getEmail(),
                            name,
                            address
                    );
                } catch (Exception e) {
                    System.err.println("⚠️ Failed to send email: " + e.getMessage());
                }

            } else {
                report.setStatus("Pending");
                System.err.println("⚠️ No nearby NGO found.");
            }

            Report saved = reportRepository.save(report);
            return ResponseEntity.ok(saved);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("❌ Server Error: " + e.getMessage());
        }
    }

    // ✅ Get all reports
    @GetMapping
    public List<Report> getAllReports() {
        return reportService.getAllReports();
    }

    // ✅ Update report status
    @PutMapping("/{id}")
    public Report updateStatus(@PathVariable Long id, @RequestParam String status) {
        return reportService.updateStatus(id, status);
    }

    // ✅ Manual assignment of a report to NGO
    @PutMapping("/{reportId}/assign")
    public ResponseEntity<Report> assignReportToNGO(
            @PathVariable Long reportId,
            @RequestParam Integer ngoId) {

        Report report = reportRepository.findById(reportId)
                .orElseThrow(() -> new RuntimeException("Report not found"));

        report.setAssignedNgoId(ngoId);
        report.setStatus("Assigned");

        NGOUser ngo = ngoUserRepository.findById(ngoId)
                .orElseThrow(() -> new RuntimeException("NGO not found"));

        try {
            emailService.sendAssignmentEmail(
                    ngo.getEmail(),
                    report.getName(),
                    report.getAddress()
            );
        } catch (Exception e) {
            System.err.println("⚠️ Email send failed on manual assign: " + e.getMessage());
        }

        return ResponseEntity.ok(reportRepository.save(report));
    }

    // ✅ Get all reports assigned to a specific NGO
    @GetMapping("/assigned/{ngoId}")
    public ResponseEntity<List<Report>> getReportsForNGO(@PathVariable Integer ngoId) {
        List<Report> reports = reportRepository.findByAssignedNgoId(ngoId);
        return ResponseEntity.ok(reports);
    }

    // 🔁 Helper method for distance calculation
    private double haversine(double lat1, double lon1, double lat2, double lon2) {
        final int R = 6371; // Earth radius in km
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);

        double a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
                + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2))
                * Math.sin(dLon / 2) * Math.sin(dLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
}
