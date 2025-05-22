import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import MessageBubble from "../Components/MessageBubble";
//import './TicketDetailView.css'; 

const TicketDetailView = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [responseText, setResponseText] = useState('');
  const [responses, setResponses] = useState([]);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [isSupportUser, setIsSupportUser] = useState(false);

  useEffect(() => {
    const fetchTicketData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        setIsSupportUser(decoded.role === 'Support');

        const ticketRes = await axios.get(`http://localhost:5094/api/ticket/${ticketId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTicket(ticketRes.data);

        // Yanıtlar
        const responseRes = await axios.get(`http://localhost:5094/api/ticket/${ticketId}/responses`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setResponses(responseRes.data);
      } catch (err) {
        console.error("Ticket detayları alınamadı:", err);
      }
    };

    fetchTicketData();
  }, [ticketId, navigate]);

  const handleSubmitResponse = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      setLoadingResponse(true);
      await axios.post(
        `http://localhost:5094/api/ticket/${ticketId}/responses`,
        JSON.stringify({ response: responseText }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setResponseText('');

      // Yanıtları yeniden al
      const responseRes = await axios.get(`http://localhost:5094/api/ticket/${ticketId}/responses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setResponses(responseRes.data);
    } catch (err) {
      console.error("Yanıt gönderilemedi:", err);
    } finally {
      setLoadingResponse(false);
    }
  };

  if (!ticket) return <div>Yükleniyor...</div>;

  return (
    <div className="container">
      <div className="sidebar">
        <div className="logo">HelpDesk</div>
        <ul className="nav">
          <li><span className="icon">🎫</span> <span className="label">Tickets</span></li>
          <li><span className="icon">👥</span> <span className="label">Agents</span></li>
          <li><span className="icon">⚙️</span> <span className="label">Settings</span></li>
        </ul>
        <div className="profile">
          <img src="https://i.pravatar.cc/40" alt="user" />
          <span>User</span>
        </div>
      </div>

      <div className="ticket-detail-area">
        <h2>Ticket Detayları</h2>
        <p><strong>Açıklama:</strong> {ticket.description}</p>
        <p><strong>Kategori:</strong> {ticket.category}</p>
        <p><strong>Öncelik:</strong> {ticket.priority}</p>
        <p><strong>Oluşturulma Tarihi:</strong> {ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : "Tarih yok"}</p>
        <p><strong>Durum:</strong> {ticket.status}</p>

        <h3>Yanıtlar</h3>
        {responses.length === 0 ? (
          <p>Henüz yanıt yok.</p>
        ) : (
          <div className="flex flex-col gap-2 my-4 max-h-[300px] overflow-y-auto">
            {responses.map((res, index) => (
              <MessageBubble key={index} message={res} />
            ))}
          </div>
        )}


        {(isSupportUser || ticket.status === 'Yanıtlandı') && (
          <div className="response-form">
            <h3>Yanıt Ver</h3>
            <textarea
              rows="4"
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Yanıtınızı yazınız..."
              disabled={loadingResponse}
            />
            <button onClick={handleSubmitResponse} disabled={loadingResponse || !responseText.trim()}>
              {loadingResponse ? 'Gönderiliyor...' : 'Yanıt Gönder'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketDetailView;
