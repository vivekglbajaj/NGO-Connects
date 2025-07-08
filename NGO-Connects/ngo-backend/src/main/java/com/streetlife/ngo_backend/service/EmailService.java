package com.streetlife.ngo_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendAssignmentEmail(String toEmail, String personName, String address) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("🚨 New Report Assigned");
        message.setText("A new report has been assigned to your NGO:\n\n" +
                "Name: " + personName + "\n" +
                "Address: " + address + "\n\n" +
                "Please take necessary action.");

        mailSender.send(message);
    }
}
