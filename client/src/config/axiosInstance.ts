import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      error.response?.data?.message === "Invalid token"
    ) {
      originalRequest._retry = true;

      try {
        await axiosInstance.get("/auth/refresh-token");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
