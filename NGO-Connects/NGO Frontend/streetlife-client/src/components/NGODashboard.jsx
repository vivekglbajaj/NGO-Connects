import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function NGODashboard() {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  useEffect(() => {
    const ngoId = localStorage.getItem("ngoId");
    if (!ngoId) {
      alert("You must log in as an NGO first.");
      navigate("/ngo-login");
      return;
    }

    const fetchReports = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/report/assigned/${ngoId}`);
        setReports(res.data);
      } catch (error) {
        console.error("Error fetching assigned reports:", error);
      }
    };

    fetchReports();
  }, [navigate, API_URL]);

  const handleLogout = () => {
    localStorage.removeItem("ngoId");
    navigate("/ngo-login");
  };

  const resolveImageUrl = (reportImageUrl) => {
    if (!reportImageUrl) return "/default-image.png";
    if (reportImageUrl.startsWith("http")) return reportImageUrl;
    if (reportImageUrl.startsWith("/images")) return `${API_URL}${reportImageUrl}`;
    return `${API_URL}/images/${reportImageUrl}`;
  };

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-purple-100 to-pink-50 min-h-screen">
      <div className="flex justify-between mb-6 items-start">
        <div className="text-center w-full">
          <h2 className="text-3xl font-bold text-purple-800">🏥 NGO Dashboard</h2>
          <h4 className="text-md text-gray-600 mt-1">Please logout before leaving the page</h4>
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            🔓 Logout
          </button>
        </div>
      </div>

      {reports.length === 0 ? (
        <p className="text-center text-gray-600">No reports assigned yet.</p>
      ) : (
        <div className="space-y-6">
          {reports.map((report) => {
            const imageUrl = resolveImageUrl(report.imageUrl);

            return (
              <div
                key={report.id}
                className="flex flex-col md:flex-row gap-6 bg-white rounded-2xl p-6 shadow-lg border border-purple-200 hover:shadow-2xl transition duration-300"
              >
                <div className="w-full md:w-1/3">
                  <img
                    src={imageUrl}
                    alt="Report"
                    className="w-full h-64 object-contain rounded-xl border bg-gradient-to-tr from-gray-50 to-purple-50"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-image.png";
                    }}
                  />
                </div>
                <div className="flex-1 space-y-2 text-gray-800">
                  <p><span className="font-semibold text-purple-700">👤 Name:</span> {report.name}</p>
                  <p><span className="font-semibold text-purple-700">🏠 Address:</span> {report.address}</p>
                  <p><span className="font-semibold text-purple-700">🧓 Age:</span> {report.age}</p>
                  <p><span className="font-semibold text-purple-700">📝 Note:</span> {report.note}</p>
                  <p>
                    <span className="font-semibold text-purple-700">📍 Location:</span>{" "}
                    <a
                      href={`https://www.google.com/maps?q=${report.latitude},${report.longitude}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 underline hover:text-blue-800"
                    >
                      View on Google Maps
                    </a>
                  </p>
                  <p><span className="font-semibold text-purple-700">📅 Time:</span> {new Date(report.timestamp).toLocaleString()}</p>
                  <p>
                    <span className="font-semibold text-purple-700">📦 Status:</span>{" "}
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        report.status === "Resolved"
                          ? "bg-green-100 text-green-700"
                          : report.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {report.status}
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default NGODashboard;
