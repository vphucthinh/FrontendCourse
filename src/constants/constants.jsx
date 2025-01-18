export const Constants = {
    API_URL: "http://localhost:5173", 
    API_ENDPOINTS: {
      AUTH: {
        LOGIN: "api/auth/login", 
        REGISTER: "api/auth/register", 
        REFRESH: "api/auth/refresh", 
      },
      USER: {
        PROFILE: "api/profiles/me/", 
      },
      IMG_ROOT: import.meta.env.VITE_LOCAL_IMG_URL, 
      CLASS_TAG: [],
      PAGE_SIZE: [10, 20, 30],
    }
  };
  