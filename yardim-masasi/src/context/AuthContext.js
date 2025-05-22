import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    // Sayfa yenilendiğinde localStorage'dan token varsa kullanıcıyı geri yükle
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const role =
        decoded[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      const name = localStorage.getItem("username");

      setUser({ name, role, token });
    }
  }, []);

  const login = (token, name) => {
  const decoded = jwtDecode(token);
  const role =
    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

  console.log("Decoded role:", role); 
  localStorage.setItem("token", token);
  localStorage.setItem("username", name);
  localStorage.setItem("role", role);

  setUser({ name, role, token });

  if (role === "Admin") {
    navigate("/admin-dashboard");
  } else if (role === "User") {
    navigate("/tickets");
  } else if (role === "Destek") {
    navigate("/support-dashboard");
  } else {
    navigate("/"); 
  }
};


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
