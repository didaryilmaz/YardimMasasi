import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Sidebar from "../Components/SideBar.js";
import "./Dashboard.css";

const TicketEditPage = () => {
    const [ticket, setTicket] = useState(null);
    const { ticketId } = useParams();

    //Sidebar'da rol ve kullanıcı adını almak için localStorage'dan verileri alıyoruz
    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");

    useEffect(() => {
    const fetchTicketDetail = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:5094/api/ticket/${ticketId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTicket(res.data);
      } catch (err) {
        console.error("Ticket detay alınamadı", err);
      }
    };

    fetchTicketDetail();
  }, [ticketId]);
  

  if (!ticket) return <div>Yükleniyor...</div>;

    return (
        <div className="container">
            <Sidebar role={role} username={username} />
                <div className="content-box">
                    <div className="detail-area content-box">
                    <h3 className="text-lg font-semibold mb-4">Ticket Bilgileri</h3>
                    <p><strong>ID:</strong> {ticket.id}</p>
                    <p><strong>Oluşturulma:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
                    <p><strong>Durum:</strong> {ticket.status}</p>

                    <div className="mt-4">
                    <h4 className="font-semibold">Sorumlu</h4>
                    <p><strong>Agent:</strong> {ticket.agent?.name || "Atanmamış"}</p>
                    <p><strong>Email:</strong> {ticket.agent?.email || "-"}</p>
                    </div>

                    <div className="mt-4">
                    <h4 className="font-semibold">Talep Eden</h4>
                    <p><strong>Ad:</strong> {ticket.user?.name || "-"}</p>
                    <p><strong>Email:</strong> {ticket.user?.email || "-"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TicketEditPage;