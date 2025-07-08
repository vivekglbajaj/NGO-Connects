import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminSignup() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/admin/signup`, form);
      if (res.status === 200) {
        alert("Signup successful. You can now login.");
        navigate("/login");
      }
    } catch (err) {
      if (err.response?.status === 409) {
        alert("Admin already exists. Try logging in.");
      } else {
        alert("Signup failed. Please try again.");
        console.error(err);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 max-w-md bg-white rounded shadow-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="border w-full p-2 rounded"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="border w-full p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded w-full"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminSignup;
