import React, { useState } from "react";

const ReportCard = ({ report, onStatusChange }) => {
  const [imgError, setImgError] = useState(false);

  // Encode the image URL to handle spaces or special characters
  const imageUrl = report.imageUrl ? encodeURI(report.imageUrl.trim()) : "";

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      {/* 🖼️ Image Section */}
      {report.imageUrl && !imgError ? (
        <img
          src={imageUrl}
          alt="Report"
          className="w-full h-48 object-cover rounded mb-2"
          onError={() => {
            setImgError(true);
            console.warn("⚠️ Image failed to load:", imageUrl);
          }}
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded mb-2">
          <span className="text-gray-500">Image not available</span>
        </div>
      )}

      {/* 📝 Report Details */}
      <h2 className="font-semibold text-lg">{report.note}</h2>
      <p className="text-sm text-gray-600">
        📍 {report.latitude}, {report.longitude}
      </p>
      <p className="text-sm text-gray-600">
        🕒 {new Date(report.timestamp).toLocaleString()}
      </p>
      <p className="text-sm text-gray-800 mt-2">
        👤 {report.name}, Age: {report.age}
      </p>
      <p className="text-sm text-gray-800">🏠 {report.address}</p>

      {/* 🔄 Status Dropdown */}
      <select
        className="mt-3 px-2 py-1 border rounded bg-gray-100"
        value={report.status}
        onChange={(e) => onStatusChange(report.id, e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Resolved">Resolved</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
};

export default ReportCard;
