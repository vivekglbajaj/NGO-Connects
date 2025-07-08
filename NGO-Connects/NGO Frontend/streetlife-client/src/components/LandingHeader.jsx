import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function LandingHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  // Only show this header on the home page
  if (location.pathname !== "/") return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 py-4 shadow-md"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        backdropFilter: "blur(8px)",
      }}
    >
      <h2 className="text-xl font-bold text-white">🌍 StreetLife Tracker</h2>
      <div className="space-x-3">
        <button
          onClick={() => navigate("/report")}
          className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-xl shadow-md hover:bg-gray-100"
        >
          📝 Report
        </button>
        <button
          onClick={() => navigate("/ngo-signup")}
          className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-xl shadow-md hover:bg-gray-100"
        >
          ➕ NGO Register
        </button>
        <button
          onClick={() => navigate("/login")}
          className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-xl shadow-md hover:bg-gray-100"
        >
          🛠 Admin Login
        </button>
        <button
          onClick={() => navigate("/ngo-login")}
          className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-xl shadow-md hover:bg-gray-100"
        >
          🏥 NGO Login
        </button>
        
      </div>
    </div>
  );
}

export default LandingHeader;
