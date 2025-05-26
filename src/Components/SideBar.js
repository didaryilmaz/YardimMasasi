import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ role, username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear(); // Token, username, role vs. hepsini temizle
    navigate("/");
  };

  return (
    <div className="sidebar">
      <div className="logo">HelpDesk</div>

      <ul className="nav">
        <li onClick={() => navigate("/ticket-list")}>
          <span className="icon">🎫</span> <span className="label">Tickets</span>
        </li>

        {(role === "Admin" || role === "Destek") && (
          <li onClick={() => navigate("/reports")}>
            <span className="icon">📊</span> <span className="label">Raporlar</span>
          </li>
        )}

        {role === "Admin" && (
          <>
            <li onClick={() => navigate("/agents")}>
              <span className="icon">👥</span> <span className="label">Agents</span>
            </li>
            <li onClick={() => navigate("/settings")}>
              <span className="icon">⚙️</span> <span className="label">Settings</span>
            </li>
          </>
        )}
      </ul>

      <div className="profile">
        <img src="https://i.pravatar.cc/40" alt="user" />
        <span>{username}</span>
        <button onClick={handleLogout} className="logout-button">Çıkış Yap</button>
      </div>
    </div>
  );
};

export default Sidebar;
