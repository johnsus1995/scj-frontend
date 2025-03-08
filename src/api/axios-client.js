import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
// Interceptors
axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("scjAuthToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response?.status === 401) {
      localStorage.removeItem("scjAuthToken");
      // window.location.replace('/auth/login');
    }

    return Promise.reject(error.response?.data);
  }
);

export default axiosClient;
