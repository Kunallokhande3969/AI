import axios from "axios";
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,  // Use environment variable
  withCredentials: true, // Include credentials (cookies) in requests
  headers: {
    "Content-Type": "application/json", // Default content type
    Accept: "application/json", 
  },
});


instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

export default instance;
