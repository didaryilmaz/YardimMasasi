import React from "react";
import { useNavigate } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ role, username }) => {
  const navigate = useNavigate();

  const commonLinks = [
    { label: "Tickets", icon: "🎫", path: "/ticket-list" },
  ];

  const roleBasedLinks = {
    user: [],
    destek: [{ label: "Reports", icon: "📊", path: "/reports" }],
    admin: [
      { label: "Reports", icon: "📊", path: "/reports" },
      { label: "Agents", icon: "👥", path: "/agents" },
      { label: "Settings", icon: "⚙️", path: "/settings" },
    ],
  };

  const links = [...commonLinks, ...(roleBasedLinks[role] || [])];

  return (
    <div className="sidebar">
      <div className="logo">HelpDesk</div>
      <ul className="nav">
        {links.map((link) => (
          <li key={link.label} onClick={() => navigate(link.path)} style={{ cursor: "pointer" }}>
            <span className="icon">{link.icon}</span>
            <span className="label">{link.label}</span>
          </li>
        ))}
      </ul>
      <div className="profile">
        <img src="https://i.pravatar.cc/40" alt={username} />
        <span>{username}</span>
      </div>
    </div>
  );
};

export default Sidebar;
