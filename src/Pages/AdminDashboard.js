import React, { useEffect, useState } from "react";
import axios from "axios";
import "./SupportDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const navigate = useNavigate();

  const categories = [
    "Yazılım Hatası", 
    "Donanım Sorunu",
    "Kullanıcı Erişimi",
    "Ağ Problemleri",
  ];

  const priorities = ["Düşük", "Orta", "Yüksek", "Acil"];

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [selectedCategory, selectedPriority]);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem("token");

      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      if (selectedPriority) params.priority = selectedPriority;

      const res = await axios.get("http://localhost:5094/api/ticket/filter", {
        headers: { Authorization: `Bearer ${token}` },
        params: params,
      });

      setTickets(res.data);
    } catch (err) {
      console.error("Ticketlar alınamadı:", err);
      alert("Ticketlar yüklenirken bir hata oluştu.");
    }
  };

  const handleDelete = async (ticketId) => {
    const confirmed = window.confirm("Bu ticket'ı silmek istediğinizden emin misiniz?");
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`http://localhost:5094/api/ticket/deleteTicket/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Ticket başarıyla silindi.");
      fetchTickets();
    } catch (err) {
      console.error("Silme hatası:", err);
      alert("Ticket silinirken bir hata oluştu.");
    }
  };

  return (
    <div className="support-container">
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

      <div className="main-content">
        <div className="content-box">
          <h2>Filtrele</h2>
          <div className="filter-grid">
            <div className="filter-item">
              <label>Kategori    </label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Hepsi</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div className="filter-item">
              <label>Öncelik    </label>
              <select value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)}>
                <option value="">Hepsi</option>
                {priorities.map((p, index) => (
                  <option key={index} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="content-box">
          <h2>Ticket Listesi</h2>
          <div className="ticket-table">
            <div className="table-header">
              <div>ID</div>
              <div>Açıklama</div>
              <div>Kategori</div>
              <div>Öncelik</div>
              <div>Durum</div>
              <div>Tarih</div>
              <div>Kullanıcı ID</div>
              <div>Aksiyonlar</div>
            </div>
            {tickets.map((ticket) => (
              <div className="table-row" key={ticket.id}>
                <div>{ticket.id}</div>
                <div>{ticket.description}</div>
                <div>{ticket.category}</div>
                <div>{ticket.priority}</div>
                <div>{ticket.status}</div>
                <div>{new Date(ticket.createdAt).toLocaleString()}</div>
                <div>{ticket.userId}</div>
                <div className="ticket-actions">
                  <button onClick={() => navigate(`/edit-ticket/${ticket.id}`)} className="edit-button">✏️</button>
                  <button onClick={() => handleDelete(ticket.id)} className="delete-button">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
