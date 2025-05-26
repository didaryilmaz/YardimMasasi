import React, { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./ReportPage.css"; 
import Sidebar from "../Components/SideBar.js";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#B455F5", "#FF4560"];

const ReportPage = () => {
  const [categoryStats, setCategoryStats] = useState([]);
  const [priorityStats, setPriorityStats] = useState([]);

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5094/api/ticket/report/category-frequency", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setCategoryStats(res.data));

    axios
      .get("http://localhost:5094/api/ticket/report/priority-frequency", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setPriorityStats(res.data));

  }, []);

  return (
    <div className="container">
      <Sidebar role={role} username={username} />

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
                  <Cell key={`cell-cat-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        ) : (
          <p>Yükleniyor...</p>
        )}

        <h3>Öncelik Dağılımı</h3>
        {priorityStats.length > 0 ? (
          <div className="chart-container">
            <PieChart width={400} height={300}>
              <Pie
                data={priorityStats}
                dataKey="ticketCount"
                nameKey="priorityName"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
                label
              >
                {priorityStats.map((entry, index) => (
                  <Cell key={`cell-pri-${index}`} fill={COLORS[index % COLORS.length]} />
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
