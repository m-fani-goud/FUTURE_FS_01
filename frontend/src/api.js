import axios from "axios";

const API = axios.create({
  baseURL: "https://future-fs-01-tg5r.onrender.com",
});

// Automatically add the token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;