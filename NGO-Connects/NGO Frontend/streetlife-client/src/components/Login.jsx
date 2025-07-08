import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("ngoId", res.data.id);

      // Optionally set token in Axios headers for future requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

      alert("Login successful");
      navigate("/ngo-dashboard");
    } catch (err) {
      alert("Invalid credentials");
      console.error("Login failed", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">NGO Login</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
          className="w-full p-2 border mb-4 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
          className="w-full p-2 border mb-4 rounded"
          required
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 text-white w-full py-2 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
}
