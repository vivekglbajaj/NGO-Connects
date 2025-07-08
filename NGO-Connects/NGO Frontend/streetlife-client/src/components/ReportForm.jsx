// ReportForm.jsx (Fully fixed and optimized)
import React, { useState } from "react";
import axios from "axios";
import LandingHeader from "./LandingHeader";

function ReportForm() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    address: "",
    note: "",
    image: null,
    latitude: "",
    longitude: ""
  });

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setForm((prev) => ({
        ...prev,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }));
    }, (err) => {
      alert("Location access denied. Enter manually.");
      console.error(err);
    });
  };

  const handleImageChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("age", form.age);
    formData.append("address", form.address);
    formData.append("note", form.note);
    formData.append("latitude", form.latitude);
    formData.append("longitude", form.longitude);
    formData.append("file", form.image);

    try {
      const res = await axios.post(`${API_URL}/api/report`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Report submitted successfully!");
      console.log(res.data);

      setForm({
        name: "",
        age: "",
        address: "",
        note: "",
        image: null,
        latitude: "",
        longitude: ""
      });
    } catch (err) {
      console.error("❌ Submission error:", err);
      alert("❌ Failed to submit. Check your network or try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 px-4 pt-20 relative">
      <LandingHeader />

      <div className="flex items-center justify-center">
        <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">📍 StreetLife Report</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2 shadow"
                required
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2 shadow"
                required
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2 shadow"
                required
              />
            </div>

            {/* Note */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Note</label>
              <input
                type="text"
                name="note"
                value={form.note}
                onChange={handleChange}
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2 shadow"
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleImageChange}
                className="mt-1 block w-full rounded-xl border border-gray-300 px-4 py-2 shadow"
                required
              />
            </div>

            {/* Coordinates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Latitude</label>
                <input
                  type="text"
                  name="latitude"
                  value={form.latitude}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 shadow"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Longitude</label>
                <input
                  type="text"
                  name="longitude"
                  value={form.longitude}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-xl border border-gray-300 px-3 py-2 shadow"
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex space-x-4 mt-4">
              <button
                type="button"
                onClick={handleLocation}
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-xl shadow"
              >📍 Auto Detect Location</button>
              <button
                type="submit"
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-xl shadow"
              >🚀 Submit Report</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ReportForm;