export const Constants = {
  API_URL: "http://localhost:8080", 
  API_ENDPOINTS: {
    AUTH: {
      LOGIN: "api/auth/login",
      REGISTER: "api/auth/register",
      REFRESH: "api/auth/refresh",
    },
    USER: {
      PROFILE: "api/profiles/me/",
    },
    COURSES: {
      ALL: "api/courses",
      DETAIL: "api/courses", 
    },
    CART: {
      BASE: "api/cart", 
    },
  },
  IMG_ROOT: import.meta.env.VITE_LOCAL_IMG_URL, 
  PAGE_SIZE: [10, 20, 30], 
};
