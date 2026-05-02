import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://gym-backedn.vercel.app/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Inject token before every request
axiosInstance.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Standard "Bearer" token format
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response Interceptor: Handle global errors (like 401 Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Optional: Clear storage and redirect to login if token is expired
      console.warn("Unauthorized! Logging out...");
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
