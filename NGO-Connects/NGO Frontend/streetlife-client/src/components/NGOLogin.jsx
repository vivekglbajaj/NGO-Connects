import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NGOLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  // Redirect if already logged in
  useEffect(() => {
    const ngoId = localStorage.getItem("ngoId");
    if (ngoId) {
      navigate("/ngo-dashboard");
    }
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/ngo/login`, form);
      localStorage.setItem("ngoId", res.data.ngoId);
      navigate("/ngo-dashboard");
    } catch (error) {
      alert("Login failed: " + (error.response?.data || error.message));
      console.error("Login Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 to-red-500 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">🔐 NGO Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          autoComplete="email"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          autoComplete="current-password"
          className="w-full border px-3 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 text-white py-2 px-4 w-full rounded hover:bg-purple-700"
        >
          🚀 Login
        </button>
      </form>
    </div>
  );
}

export default NGOLogin;
