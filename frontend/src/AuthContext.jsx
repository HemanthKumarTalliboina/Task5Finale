// frontend/src/AuthContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import api from "./apiClient";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("access_token"));
  const [user, setUser] = useState(null); // /auth/me response
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) {
      fetchMe();
    }
  }, [token]);

  const fetchMe = async () => {
    try {
      const res = await api.get("/auth/me");
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch /auth/me", err);
      logout();
    }
  };

  const login = async (username, password) => {
    setLoading(true);
    try {
      const body = new URLSearchParams();
      body.append("username", username);
      body.append("password", password);

      const res = await api.post("/auth/login", body, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      const accessToken = res.data.access_token;
      localStorage.setItem("access_token", accessToken);
      setToken(accessToken);

      await fetchMe();

      return { success: true };
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.detail || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
