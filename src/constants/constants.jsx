export const Constants = {
  API_URL: "http://localhost:8080", // Chắc chắn đúng với API URL backend
  API_ENDPOINTS: {
    AUTH: {
      LOGIN: "api/auth/login",
      REGISTER: "api/auth/register",
      REFRESH: "api/auth/refresh",
    },
    USER: {
      PROFILE: "api/users/me",
    },
    COURSES: {
      ALL: "api/courses", 
      DETAIL: "api/courses", 
    },
    CART: {
      BASE: "api/cart",
      ADD: "add",        
      REMOVE: "remove",  
    },
  },
  IMG_ROOT: import.meta.env.VITE_LOCAL_IMG_URL,
  PAGE_SIZE: [10, 20, 30],
};
