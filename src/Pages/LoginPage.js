import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; 
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const [name, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // AuthContext içinden yönlendiriyor

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5094/api/Auth/login", {
        name,
        password,
      });

      const token = response.data.token;
      login(token, name); // AuthContext içinden yönlendiriyor
    } catch (error) {
      console.error("Giriş hatası:", error);
      alert("Giriş başarısız: " + (error.response?.data || error.message));
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Giriş Yap</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Kullanıcı Adı"
            value={name}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Şifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Giriş Yap</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
