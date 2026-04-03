import React, { createContext, useState, useContext } from "react";

// 1. Create the Context
const AuthContext = createContext();

// 2. Create the Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const loginSession = (userData, userToken) => {
    setToken(userToken);
    setUser(userData);
    localStorage.setItem("token", userToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loginSession, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// 3. The CRITICAL Export the browser is looking for
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
