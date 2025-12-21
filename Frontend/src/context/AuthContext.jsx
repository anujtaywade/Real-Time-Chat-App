import React, { createContext, useState, useEffect } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.user);
        console.log("User state:", User);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  const login = async (email, password) => {
    try {
      await api.post("/auth/login", { email, password });

    
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
