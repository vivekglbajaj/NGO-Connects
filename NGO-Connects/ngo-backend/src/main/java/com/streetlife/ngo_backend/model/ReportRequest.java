package com.streetlife.ngo_backend.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;public class ReportRequest {
    private String note;
    private String imageUrl;
    private double latitude;
    private double longitude;

    // Manually write getters
    public String getNote() {
        return note;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    // And setters if needed
}