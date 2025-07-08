import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const backgroundImages = [
  "/images/slide1.jpg",
  "/images/slide2.jpg",
  "/images/slide3.jpg",
  "/images/slide4.jpg",
];

function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 6000); // change every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen relative text-white overflow-hidden transition-all duration-1000"
      style={{
        backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
   

      {/* ⬇️ Main Content */}
      <main className="pt-32 px-6 text-center max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl font-bold mb-6 drop-shadow-lg">
          “Be the reason someone believes in the goodness of people.” <br />
          <span className="text-white text-5xl">Helping the Homeless with AI 🧠</span>
        </h2>
        <p className="text-lg leading-relaxed drop-shadow-md">
          StreetLife Tracker is a community-powered initiative to support the homeless by reporting their locations
          and conditions. With the help of AI image analysis, location tagging, and NGO integrations, we ensure
          fast and efficient help. Just take a photo, auto-detect the location, and submit. Our admin team or NGO
          workers will take care of the rest.
        </p>

        <div className="mt-10 flex justify-center space-x-6">
          <Link
            to="/report"
            className="bg-white text-purple-600 font-bold px-6 py-3 rounded-xl shadow-xl hover:bg-gray-100"
          >
            📢 Report Now
          </Link>
          
          <Link
            to="/login"
            className="bg-purple-800 text-white font-bold px-6 py-3 rounded-xl shadow-xl hover:bg-purple-900"
          >
            🔐 Admin Portal
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-24 text-center text-sm text-white/80 relative z-10">
        © 2025 StreetLife Tracker | Made with ❤️ to support humanity
      </footer>
    </div>
  );
}

export default HomePage;
