import React, { createContext, useState, useEffect } from "react";

import api from "../api/axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [User, setUser] = useState(null);

  useEffect(() => {
    
   const fetchUser = async () => {
    try {
      const res = await api.get("/auth/me")
      setUser(res.data.user)
    } catch (error) {
      setUser(null)
    }
   }
   fetchUser()
  }, []);



  const login = async(email , password) => {
    try {
      await api.post("/auth/login",{email,password})
    const res =  await api.get("/auth/me")
    setUser(res.data.user)
    } catch (error) {
      console.log("login failed",error)
      setUser(null)
      throw error
    }
  
  };
 


  const logout = async() => {
  try {
    await api.post("/auth/logout",{})
  setUser(null)
  } catch (error) {
    console.log("logout error",error)
  }
  };

  return (
    <AuthContext.Provider value={{ User, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
