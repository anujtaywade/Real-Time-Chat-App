import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [User, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ token, ...decoded });
      } catch {
        setUser(null);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (data) => {
    const decoded = jwtDecode(data.token);
    localStorage.setItem("token", data.token);
    setUser({ token: data.token, ...decoded ,...data.user });
  };
 


  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ User, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
