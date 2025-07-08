import React from "react";
import { Navigate } from "react-router-dom";
const token = localStorage.getItem("token");
return token ? <Outlet /> : <Navigate to="/login" />;
function PrivateRoute({ children }) {
  const isLoggedIn = localStorage.getItem("token") !== null;
  return isLoggedIn ? children : <Navigate to="/login" />;

}

export default PrivateRoute;

