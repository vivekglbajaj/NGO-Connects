import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

// Components
import HomePage from "./components/HomePage";
import ReportForm from "./components/ReportForm";
import NGOLogin from "./components/NGOLogin";
import NGOSignup from "./components/NGOSignup";
import AdminLogin from "./components/AdminLogin";
import LandingHeader from "./components/LandingHeader";
import BackToHomeButton from "./components/BackToHomeButton";
import AdminDashboard from "./components/AdminDashboard";
import NGODashboard from "./components/NGODashboard";

// ✅ Admin Protected Route
function AdminPrivateRoute({ children }) {
  const isAdmin = localStorage.getItem("admin");
  return isAdmin ? children : <Navigate to="/login" />;
}

// ✅ NGO Protected Route
function NGOPrivateRoute({ children }) {
  const ngoId = localStorage.getItem("ngoId");
  return ngoId ? children : <Navigate to="/ngo-login" />;
}

// ✅ Wrapper to show/hide Header & Back button
function AppWrapper() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <>
      {isHome && <LandingHeader />}
      {!isHome && <BackToHomeButton />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/report" element={<ReportForm />} />
        <Route path="/ngo-signup" element={<NGOSignup />} />
        <Route path="/ngo-login" element={<NGOLogin />} />
        <Route path="/login" element={<AdminLogin />} />

        {/* ✅ Aliases to fix old broken paths */}
        <Route path="/admin/dashboard" element={<Navigate to="/admin-dashboard" />} />
        <Route path="/ngo/dashboard" element={<Navigate to="/ngo-dashboard" />} />

        {/* ✅ Protected Routes */}
        <Route
          path="/admin-dashboard"
          element={
            <AdminPrivateRoute>
              <AdminDashboard />
            </AdminPrivateRoute>
          }
        />
        <Route
          path="/ngo-dashboard"
          element={
            <NGOPrivateRoute>
              <NGODashboard />
            </NGOPrivateRoute>
          }
        />

        {/* ❌ 404 Fallback */}
        <Route path="*" element={<p className="text-center mt-20 text-xl text-red-600">404 - Page Not Found</p>} />
      </Routes>
    </>
  );
}

// ✅ Main App
function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
