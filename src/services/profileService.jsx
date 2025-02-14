import api from "@/api/api.jsx";
import {Constants} from "@/constants/constants.jsx";

const PROFILE_ENDPOINTS = Constants.API_ENDPOINTS.USER;

export const getUserProfile = async (username) => {
  try {
    const response = await api.get(`${PROFILE_ENDPOINTS.PROFILE(username)}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return [];
  }
};

export const getUserpicture = async (profileId) => {
  try {
    const response = await api.get(PROFILE_ENDPOINTS.PROFILE_IMAGE(profileId))
    return response.data;
  }
  catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
};