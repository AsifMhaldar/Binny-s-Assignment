import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, user: null });

  // Load token from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAuth({ token, user: decoded });
      } catch (error) {
        console.error("Invalid token");
        localStorage.removeItem("token");
        setAuth({ token: null, user: null });
      }
    }
  }, []);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      localStorage.setItem("token", token);
      setAuth({ token, user: decoded });
    } catch (error) {
      console.error("Login token invalid");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuth({ token: null, user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
