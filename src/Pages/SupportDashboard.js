import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';
import "./TicketPage.css";
import Sidebar from "../Components/SideBar.js";
import { jwtDecode } from 'jwt-decode'; 

const SupportDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('Token bulunamadı. Giriş yapmanız gerekiyor.');
          return;
        }

        // JWT'den kullanıcı ID'sini al
        const decoded = jwtDecode(token);
        const userId = parseInt(
          decoded["nameid"] || decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
        );

        const res = await axios.get('http://localhost:5094/api/ticket/getAllTicketsByRole', {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log('Alınan ticketlar:', res.data);

        // Sadece kendisine atanmış ticketları filtrele
        const assignedTickets = res.data.filter(ticket => ticket.assignedSupportId === userId || ticket.AssignedSupportId === userId);
        setTickets(assignedTickets);
      } catch (err) {
        console.error('Ticketlar alınamadı:', err);
        alert('Ticketlar yüklenirken bir hata oluştu. Lütfen tekrar deneyin.');
      }
    };

    fetchTickets();
  }, []);

  return (
    <div className="container">
      <Sidebar role={role} username={username} />
      <div className="content-box">
        <h2>Atanmış Ticketlarım</h2>
        <div className="ticket-table">
          <div className="table-header">
            <div>ID</div>
            <div>Açıklama</div>
            <div>Kategori</div>
            <div>Öncelik</div>
            <div>Durum</div>
            <div>Tarih</div>
            <div>Gönderen ID</div>
          </div>
          {tickets.map((ticket) => (
            <div
              className="table-row"
              key={ticket.id}
              onClick={() => navigate(`/ticket/${ticket.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <div>{ticket.id}</div>
              <div>{ticket.description}</div>
              <div>{ticket.category?.name || ticket.category || "-"}</div>
              <div>{ticket.priority?.name || ticket.priority || "-"}</div>
              <div>{ticket.isCompleted ? "Tamamlandı" : "Açık"}</div>
              <div>{new Date(ticket.dateTime).toLocaleString()}</div>
              <div>{ticket.userId}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;
