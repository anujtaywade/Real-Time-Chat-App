import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Check login via COOKIE on page refresh
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me"); // cookie auto sent
        setUser(res.data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // ✅ COOKIE BASED LOGIN ONLY
  const login = async (email, password) => {
    try {
      await api.post("/auth/login", { email, password });

      // after login, fetch user using cookie
      const res = await api.get("/auth/me");
      setUser(res.data.user);

    } catch (error) {
      console.log("login failed", error);
      setUser(null);
      throw error;
    }
  };

  // ✅ COOKIE BASED LOGOUT ONLY
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      setUser(null);
    } catch (error) {
      console.log("logout error", error);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ User, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
