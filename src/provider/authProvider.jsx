import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { setToken, refreshAuthToken } from "@/services/authService.jsx";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [atoken, setAtoken] = useState(sessionStorage.getItem("atoken"));
  const [isRefreshed, setIsRefreshed] = useState(false);

  useEffect(() => {
    const refreshAuth = async () => {
      if (!atoken) {
        const newToken = await refreshAuthToken();
        if (newToken) {
          setAtoken(newToken);
        }
      }
      setIsRefreshed(true); // Mark as refreshed after attempting
    };

    refreshAuth();
  }, [atoken]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({ atoken, setToken, isRefreshed }), [atoken, isRefreshed]);

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;
