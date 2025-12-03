// src/apiClient.js
import axios from "axios";

// Change this when running locally vs deployed if needed
const API_BASE_URL = "https://task5finale-backend.onrender.com";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token automatically (if present)
api.interceptors.request.use((config) => {
const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
