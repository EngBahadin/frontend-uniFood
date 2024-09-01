import { orderNewAccessToken } from "@/app/_components/authentication/Auth";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/", // Replace with your base URL
});

// Request interceptor to add Authorization header if token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `JWT ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Failed to send request");
    return Promise.reject(error);
  }
);

// Response interceptor to handle expired tokens and other errors
api.interceptors.response.use(
  (response) => response, // Pass through if response is successful
  async (error) => {
    const originalRequest = error.config; // it gets back the original config

    if (error.response?.status === 401 && !originalRequest._retry) {
      // to avoid infinite loop
      originalRequest._retry = true;

      try {
        const newToken = await orderNewAccessToken(); // Request a new access token

        if (newToken) {
          originalRequest.headers["Authorization"] = `JWT ${newToken}`; // Update header with new token
          return api(originalRequest); // Retry the original request with new token
        } else {
          console.error("Session expired. Please log in again.");
          // Optionally redirect to login page or handle session expiration
        }
      } catch (tokenError) {
        console.error("Failed to refresh token. Please log in again.");
        // Optionally handle additional error logic here
      }
    }

    console.error("An error occurred. Please try again.");
    return Promise.reject(error);
  }
);

export default api;

export const apiAuth = axios.create({
  baseURL: "http://localhost:8000/auth",
  headers: {
    "Content-Type": "application/json",
  },
});
