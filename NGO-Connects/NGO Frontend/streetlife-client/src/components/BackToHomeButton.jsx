// src/components/BackToHomeButton.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

function BackToHomeButton() {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on home page
  if (location.pathname === "/") return null;

  return (
    <div className="fixed top-4 left-4 z-50">
      <button
        onClick={() => navigate("/")}
        className="bg-white text-purple-700 font-semibold px-4 py-2 rounded-xl shadow hover:bg-gray-100"
      >
        ⬅️ 
      </button>
    </div>
  );
}

export default BackToHomeButton;
