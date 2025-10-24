import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [User, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token'); 
        if (token) {
          const res = await api.get("/auth/me");
          setUser(res.data.user);
        }
      } catch (error) {
        setUser(null);
        localStorage.removeItem('token'); 
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      
      
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (error) {
      console.log("login failed", error);
      setUser(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await api.post("/auth/logout", {});
      
      
      localStorage.removeItem('token');
      
      setUser(null);
    } catch (error) {
      console.log("logout error", error);
      localStorage.removeItem('token'); 
    }
  };

  return (
    <AuthContext.Provider value={{ User, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};