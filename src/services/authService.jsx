import axios from "axios";
import { Constants } from "@/constants/constants.jsx";
import { apiUser } from "@/api/api";

/**
 * Extracts username from JWT token.
 * @param {string} token - The access token (JWT).
 * @returns {string | null} Username if available, otherwise null.
 */
export const getUsernameFromToken = (token) => {
  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    console.log(payload);
    return payload?.sub || null; // Extract username if available
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

/**
 * Stores token and username in sessionStorage.
 * @param {string} token - The access token.
 */
export const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    sessionStorage.setItem("atoken", token);

    // Extract username and store it
    const username = getUsernameFromToken(token);
    if (username) {
      sessionStorage.setItem("username", username);
    }
  } else {
    delete axios.defaults.headers.common["Authorization"];
    sessionStorage.removeItem("atoken");
    sessionStorage.removeItem("username");
  }
};

/**
 * Refreshes the authentication token only if refresh token is valid.
 * @returns {Promise<string | null>} New access token if successful, null if failed or expired.
 */
export const refreshAuthToken = async () => {
  const refreshToken = sessionStorage.getItem("rtoken");

  if (!refreshToken || isTokenExpired(refreshToken)) {
    console.warn("Refresh token is expired or invalid.");
    sessionStorage.removeItem("rtoken"); // Remove expired token
    return null;
  }

  try {
    const response = await apiUser.post(
      Constants.API_ENDPOINTS.AUTH.REFRESH,
      { refresh: refreshToken },
      { headers: { "Content-Type": "application/json" } }
    );

    if (response.data?.access) {
      setToken(response.data.access);
      return response.data.access;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    sessionStorage.removeItem("rtoken"); // Remove invalid refresh token
  }

  return null;
};

/**
 * Checks if a given JWT token is expired.
 * @param {string} token - The JWT token (access or refresh).
 * @returns {boolean} True if expired, false if still valid.
 */
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT payload
    const expiryTime = payload?.exp * 1000; // Convert to milliseconds
    return expiryTime < Date.now(); // Check if token has expired
  } catch (error) {
    console.error("Invalid token:", error);
    return true; // Treat invalid tokens as expired
  }
};
