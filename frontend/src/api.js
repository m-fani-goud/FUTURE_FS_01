import axios from "axios";

const API = axios.create({
  baseURL: "https://future-fs-01-tg5r.onrender.com"
});

export default API;