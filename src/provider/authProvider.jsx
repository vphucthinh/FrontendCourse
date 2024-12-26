import { apiUser } from "@/api/api";
import { Constants } from "@/constants/constants";
import axios from "axios";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

// Create an authentication context
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(sessionStorage.getItem("token"));
  const [isRefreshed, setIsRefreshed] = useState(false);

  // Function to set the authentication token and update session storage

  // Function to set the authentication token
  const setToken = (newToken) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      sessionStorage.setItem("atoken", token);
    } else {
      setIsRefreshed(false);
      const refresh_token =
          sessionStorage.getItem("rtoken") || localStorage.getItem("rtoken");
      setTimeout(async () => {
        try {
          if (!refresh_token) {
            throw new Error("No token found");
          }
          const response = await apiUser.post(
              Constants.API_ENDPOINTS.AUTH.REFRESH,
              {
                refresh: refresh_token,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
          );
          if (response?.access) {
            setToken(response?.access);
            setIsRefreshed(true);
          } else {
            throw new Error("Invalid token");
          }
        } catch (error) {
          localStorage.removeItem("rtoken");
          sessionStorage.removeItem("rtoken");
          delete axios.defaults.headers.common["Authorization"];
          setIsRefreshed(true);
        }
      }, 1000);
    }
  }, [token]);


  // // Function to set the refresh token and update session storage
  // const setRefreshToken = (newRefreshToken) => {
  //   setRefreshToken_(newRefreshToken);
  //   if (newRefreshToken) {
  //     sessionStorage.setItem("rtoken", newRefreshToken);
  //   } else {
  //     sessionStorage.removeItem("rtoken");
  //   }
  // };

  // Memoized value of the authentication context
  const contextValue = useMemo(
      () => ({
        token,
        setToken,
        isRefreshed,
      }),
      [token, isRefreshed]
  );

  // Provide the authentication context to the children components
  return (
      <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;