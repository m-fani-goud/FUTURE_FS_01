import axios from "axios";

const API = axios.create({
  // Added /api as a likely prefix to fix your 404
  baseURL: "https://future-fs-01-tg5r.onrender.com/api", 
});

// Interceptor to attach token to headers automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;