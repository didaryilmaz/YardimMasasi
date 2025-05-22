import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SupportDashboard.css';
import { useNavigate } from 'react-router-dom';
import "./TicketPage.css";
import Sidebar from "../Components/SideBar.js";

const SupportDashboard = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  //Sidebar'da rol ve kullanıcı adını almak için localStorage'dan verileri alıyoruz
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

        const res = await axios.get('http://localhost:5094/api/ticket/getAllTicketsByRole', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setTickets(res.data);
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
                  <div>{ticket.category}</div>
                  <div>{ticket.priority}</div>
                  <div>{ticket.status}</div>
                  <div>{new Date(ticket.createdAt).toLocaleString()}</div>
                  <div>{ticket.userId}</div>
                </div>
              ))}
            </div>
          </div>
    </div>
  );
};

export default SupportDashboard;
