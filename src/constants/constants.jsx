export const Constants = {
  API_URL: "http://localhost:5173", // Change this to the actual backend URL
  API_ENDPOINTS: {
    AUTH: {
      LOGIN: "api/auth/login",
      REGISTER: "api/auth/register",
      REFRESH: "api/auth/refresh",
    },
    CHECKOUT: {
      STRIPE_SESSION: (userName) => `api/payment/stripe/${userName}/check-out-session`,
    },
    USER: {
      PROFILE: (username) => `/api/profile/${username}/get-profile`,
      UPDATE_PROFILE: (username) => `/api/profile/${username}/update-user-profile`,
      UPLOAD_AVATAR: "/api/profile/upload-avatar",
    },
    COURSES: {
      GET_ALL: "api/courses/get-all",
      DETAIL: "api/courses/detail",  
      CREATE: "api/courses/create-course",
      UPDATE: "api/courses/update",  
      DELETE: "api/courses/delete",  
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
