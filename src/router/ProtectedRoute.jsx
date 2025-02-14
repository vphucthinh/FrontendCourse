import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/provider/authProvider.jsx";
import { useEffect, useState } from "react";

export const ProtectedRoute = () => {
  const { atoken, isRefreshed } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Token:", atoken);
    console.log("Is Refreshed:", isRefreshed);

    // Wait for the refresh process to complete before setting loading to false
    if (isRefreshed) {
      setIsLoading(false);
    }
  }, [atoken, isRefreshed]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!atoken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
