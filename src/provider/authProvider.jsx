import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Constants } from "@/constants/constants.jsx";
import { apiUser } from "@/api/api";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken_] = useState(sessionStorage.getItem("token"));
  const [isRefreshed, setIsRefreshed] = useState(false);

  const setToken = (newToken) => {
    setToken_(newToken);
    if (newToken) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
      sessionStorage.setItem("atoken", newToken);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      sessionStorage.removeItem("atoken");
    }
  };

  useEffect(() => {
    const refresh_token =
      sessionStorage.getItem("rtoken") || localStorage.getItem("rtoken");

    if (!token && refresh_token) {
      const refreshAuth = async () => {
        try {
          const response = await apiUser.post(
            Constants.API_ENDPOINTS.AUTH.REFRESH,
            { refresh: refresh_token },
            { headers: { "Content-Type": "application/json" } }
          );

          if (response.data?.access) {
            setToken(response.data.access);
            setIsRefreshed(true);
          } else {
            throw new Error("Invalid token");
          }
        } catch (error) {
          localStorage.removeItem("rtoken");
          sessionStorage.removeItem("rtoken");
          setIsRefreshed(true);
        }
      };

      refreshAuth();
    }
  }, [token]);

  const contextValue = useMemo(() => ({ token, setToken, isRefreshed }), [token, isRefreshed]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;