package com.streetlife.ngo_backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image_url") // correctly maps snake_case to camelCase
    private String imageUrl;  // ✅ FIXED

    private String name;
    private int age;
    private String address;
    private String note;
    private double latitude;
    private double longitude;
    private String status;

    @Column(name = "timestamp", columnDefinition = "DATETIME(6)")
    private LocalDateTime timestamp;

    @Column(name = "assigned_ngo_id")
    private Integer assignedNgoId;

    public Report() {}

    public Report(Long id, String name, int age, String address, String note, String imageUrl,
                  double latitude, double longitude, String status, LocalDateTime timestamp, Integer assignedNgoId) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.address = address;
        this.note = note;
        this.imageUrl = imageUrl;
        this.latitude = latitude;
        this.longitude = longitude;
        this.status = status;
        this.timestamp = timestamp;
        this.assignedNgoId = assignedNgoId;
    }

    // Getters
    public Long getId() { return id; }
    public String getImageUrl() { return imageUrl; }
    public String getName() { return name; }
    public int getAge() { return age; }
    public String getAddress() { return address; }
    public String getNote() { return note; }
    public double getLatitude() { return latitude; }
    public double getLongitude() { return longitude; }
    public String getStatus() { return status; }
    public LocalDateTime getTimestamp() { return timestamp; }
    public Integer getAssignedNgoId() { return assignedNgoId; }

    // Setters
    public void setId(Long id) { this.id = id; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public void setName(String name) { this.name = name; }
    public void setAge(int age) { this.age = age; }
    public void setAddress(String address) { this.address = address; }
    public void setNote(String note) { this.note = note; }
    public void setLatitude(double latitude) { this.latitude = latitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }
    public void setStatus(String status) { this.status = status; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    public void setAssignedNgoId(Integer assignedNgoId) { this.assignedNgoId = assignedNgoId; }
}
