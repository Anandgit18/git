
import axios from "axios";
import { BASE_URL } from "../utils/constant";

export const Axios = axios.create({
    baseURL: BASE_URL,
    mode: "no-cors",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
    },
    withCredentials: false,

});

// Request Intercepter

// Axios.interceptors.request.use((config) => {

//     const token = localStorage.getItem("token");
//     config.headers = {
//         ...config.headers,
//         Authorization: `Bearer ${token}`,
//     };
// });

// Response Intercepter

// Axios.interceptors.response.use(
//     (response) => response,
//     (error) = {
//         if (
//            (error.response && error.response.status === 401) ||
//            (error.response && error.response.status === 403)
//         )
//         {
//             window.location.reload();
//         }
//         return Promise.reject(error);
//     };

// );