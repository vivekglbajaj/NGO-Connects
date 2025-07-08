import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/admin/login`, {
        email: form.email,
        password: form.password
      });

      if (res.data.admin) {
        // ✅ Set a simple flag in localStorage
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminEmail", form.email);

        // ✅ Redirect to dashboard
        navigate("/admin/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white w-full py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
