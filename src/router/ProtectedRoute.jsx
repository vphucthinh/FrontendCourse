import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/provider/authProvider.jsx";
import { useEffect } from "react";

export const ProtectedRoute = () => {
  const { token, isRefreshed } = useAuth();
  // Check if the user is authenticated
  useEffect(() => {
    if (!token && isRefreshed) {
      // If not authenticated, redirect to the login page
      return <Navigate to="/login" />;
    }
  }, [token, isRefreshed]);

  // If authenticated, render the child routes
  return token && isRefreshed ? <Outlet /> : <div>Loading...</div>;
};
