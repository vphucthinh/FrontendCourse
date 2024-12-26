export const Constants = {
    API_URL: import.meta.env.VITE_LOCAL_API_URL,
    API_ENDPOINTS: {
        AUTH: {
            TOKEN: "token",
            REFRESH: "token/refresh",
        },
        USER: {
            PROFILE: "/profiles/me/"
        },
        IMG_ROOT: import.meta.env.VITE_LOCAL_IMG_URL,
        CLASS_TAG: [],
        PAGE_SIZE: [10, 20, 30],
    }
};
