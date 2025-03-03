import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token available");

    const response = await axios.post("/api/users/refresh-token", {
      refreshtoken: refreshToken,
    });

    const newAccessToken = response.data.data.accessToken;
    const newRefreshToken = response.data.data.refreshToken;

    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
    return newAccessToken;
  } catch (error) {
    toast.error("Session expired. Please log in again.");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("role");
    window.location.href = "/auth";
    throw error;
  }
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      console.log("Access token expired. Attempting to refresh...");
      try {
        const newAccessToken = await refreshAccessToken();

        // Retry the failed request with the new token
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(error.config);
      } catch (err) {
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
