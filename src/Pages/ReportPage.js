import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useNavigate } from "react-router-dom";
import "./ReportPage.css"; 

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#B455F5", "#FF4560"];

const ReportPage = () => {
  const [categoryStats, setCategoryStats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5094/api/ticket/report/category-frequency", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCategoryStats(res.data));

  }, []);

  return (
    <div className="report-container">
      <div className="sidebar">
        <div className="logo">HelpDesk</div>
        <ul className="nav">
          <li onClick={() => navigate("/ticket-list")}>
            <span className="icon">🎫</span> <span className="label">Tickets</span>
          </li>
          <li onClick={() => navigate("/reports")}>
            <span className="icon">📊</span> <span className="label">Raporlar</span>
          </li>
        </ul>
        <div className="profile">
          <img src="https://i.pravatar.cc/40" alt="admin" />
          <span>Admin</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <h2>Raporlar</h2>

        <h3>En Çok Ticket Gelen Kategoriler</h3>
          {categoryStats.length > 0 ? (
            <div className="chart-container">
              <PieChart width={400} height={300}>
                <Pie
                  data={categoryStats}
                  dataKey="ticketCount"
                  nameKey="categoryName"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {categoryStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          ) : (
            <p>Yükleniyor...</p>
          )}

      </div>
    </div>
  );
};

export default ReportPage;
