import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function NGOSignup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: ""
  });

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setForm((prevForm) => ({
          ...prevForm,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6)
        }));
      },
      (err) => {
        alert("Failed to fetch location");
        console.error(err);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/ngo/signup`, form);
      alert("✅ NGO Registered Successfully");
      navigate("/ngo-login");
    } catch (err) {
      console.error("Signup failed:", err);
      alert("❌ Signup failed. Email may already exist.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full space-y-4">
        <h2 className="text-2xl font-bold text-center">📌 NGO Signup</h2>

        <input
          name="name"
          placeholder="NGO Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <div className="flex gap-2">
          <input
            type="text"
            name="latitude"
            placeholder="Latitude"
            value={form.latitude}
            onChange={handleChange}
            className="w-1/2 border px-3 py-2 rounded"
            required
          />
          <input
            type="text"
            name="longitude"
            placeholder="Longitude"
            value={form.longitude}
            onChange={handleChange}
            className="w-1/2 border px-3 py-2 rounded"
            required
          />
        </div>

        <button
          type="button"
          onClick={handleLocation}
          className="bg-gray-200 text-black py-2 px-4 w-full rounded"
        >
          📍 Auto Detect Location
        </button>

        <button type="submit" className="bg-blue-600 text-white py-2 px-4 w-full rounded">
          ✅ Register
        </button>

        <p className="text-center text-sm text-gray-700 mt-2">
          Already registered?{" "}
          <Link to="/ngo-login" className="text-blue-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}

export default NGOSignup;
