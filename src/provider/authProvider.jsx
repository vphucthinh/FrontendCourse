import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Constants } from "@/constants/constants.jsx";
import { apiUser } from "@/api/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [atoken, setToken_] = useState(sessionStorage.getItem("atoken"));
  const [isRefreshed, setIsRefreshed] = useState(false);

  // Function to set token and persist in sessionStorage
  const setToken = (newToken) => {
    setToken_(newToken);
    if (newToken) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
      sessionStorage.setItem("atoken", newToken); // Store token in sessionStorage
    } else {
      delete axios.defaults.headers.common["Authorization"];
      sessionStorage.removeItem("atoken"); // Remove token on logout
    }
  };

  useEffect(() => {
    const refresh_token =
      sessionStorage.getItem("rtoken") || localStorage.getItem("rtoken");

    if (!atoken && refresh_token) {
      const refreshAuth = async () => {
        try {
          const response = await apiUser.post(
            Constants.API_ENDPOINTS.AUTH.REFRESH,
            { refresh: refresh_token },
            { headers: { "Content-Type": "application/json" } }
          );

          if (response.data?.access) {
            console.log("Token refreshed:", response.data.access); // Log new token
            setToken(response.data.access);
            setIsRefreshed(true);
          } else {
            throw new Error("Invalid token");
          }
        } catch (error) {
          console.log("Error refreshing token:", error); // Log error
          localStorage.removeItem("rtoken");
          sessionStorage.removeItem("rtoken");
          setIsRefreshed(true); // Set to true to stop loading
        }
      };

      refreshAuth();
    } else {
      setIsRefreshed(true); // Token is already present, no need to refresh
    }
  }, [atoken]);

  // Memoize context to avoid unnecessary re-renders
  const contextValue = useMemo(() => ({ atoken, setToken, isRefreshed }), [atoken, isRefreshed]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
