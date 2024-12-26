import axios from "axios";
import {Constants} from "../constants/constants.jsx";

export const api = axios.create({
    baseURL: Constants.API_URL,
});

export const apiUser = axios.create({
    baseURL: Constants.API_URL,
});

apiUser.interceptors.request.use(
    (config) => {
        config.headers["Content-Type"] = "application/json";
        return config;
    },
    (error) => Promise.reject(error?.response?.data)
);

apiUser.interceptors.response.use(
    (res) => {
        return res?.data;
    },
    (error) => {
        return Promise.reject(error?.response?.data);
    }
);

api.interceptors.response.use(
    (res) => {
        return res?.data;
    },
    async (error) => {
        const prevReq = error?.config;
        if (error?.response?.status === 401 && !prevReq._retry) {
            prevReq._retry = true;
            try {
                const rtoken = sessionStorage.getItem("rtoken");
                const response = await apiUser.post(
                    Constants.API_ENDPOINTS.AUTH.REFRESH,
                    {
                        refresh: rtoken,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                prevReq.headers["Authorization"] = `Bearer ${response?.access}`;

                sessionStorage.setItem("atoken", response?.access);
                return api(prevReq);
            } catch (error) {
                sessionStorage.removeItem("rtoken");
                sessionStorage.removeItem("atoken");
                return Promise.reject(error?.response?.data);
            }
        }
        return Promise.reject(error?.response?.data);
    }
);

api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem("atoken");
        if (token && !config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error?.response?.data)
);

export default api;