export const Constants = {
  API_URL: "http://localhost:5173", //point to frontend url then proxy will point to bakcend URL
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
