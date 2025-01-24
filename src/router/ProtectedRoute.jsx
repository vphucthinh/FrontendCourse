import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/provider/authProvider.jsx";
import { useEffect } from "react";

export const ProtectedRoute = () => {
  const { atoken, isRefreshed } = useAuth();

  // Log token and isRefreshed to check their values
  useEffect(() => {
    console.log("Token:", atoken); // Log token
    console.log("Is Refreshed:", isRefreshed); // Log isRefreshed
  }, [atoken, isRefreshed]);

  // If not authenticated or not refreshed, show loading screen
  if (!isRefreshed) {
    return <div>Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!atoken) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render child routes
  return <Outlet />;
};
