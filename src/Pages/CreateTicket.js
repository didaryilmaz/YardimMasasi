import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ClientSideRowModelModule } from 'ag-grid-community';
import "./TicketPage.css";
import Sidebar from "../Components/SideBar.js";

const API_URL = "http://localhost:5094/api/Ticket";

const TicketForm = () => {
  const [tickets, setTickets] = useState([]);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [priorityId, setPriorityId] = useState("");
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const fetchTickets = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/mytickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formattedTickets = response.data.map(ticket => ({
        id: ticket.id,
        description: ticket.description,
        status: ticket.status,
        category: ticket.category,
        priority: ticket.priority,
        createdAt: ticket.createdAt,
        isResolved: ticket.isResolved
      }));

      setTickets(formattedTickets);
    } catch (error) {
      console.error("Ticketlar alınırken hata:", error);
    }
  }, [token]);

  const fetchCategories = useCallback(async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Kategori cevabı:", response.data); 
    setCategories(response.data);
  } catch (error) {
    console.error("Kategoriler alınırken hata:", error);
  }
}, [token]);

const fetchPriorities = useCallback(async () => {
  try {
    const response = await axios.get(`${API_URL}/priorities`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Öncelik cevabı:", response.data); 
    setPriorities(response.data);
  } catch (error) {
    console.error("Öncelikler alınırken hata:", error);
  }
}, [token]);


  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchTickets();
      fetchCategories();
      fetchPriorities();
    }
  }, [token, navigate, fetchTickets, fetchCategories, fetchPriorities]);

  const handleSubmit = async (e) => {

    const ticketData = {
      description,
      categoryId: parseInt(categoryId),
      priorityId: parseInt(priorityId),
    };
    console.log("Gönderilecek veri:", ticketData);
    try {
      await axios.post(`${API_URL}/createTicket`, ticketData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert("Talep başarıyla gönderildi!");
      setDescription("");
      setCategoryId("");
      setPriorityId("");
      fetchTickets();
    } catch (error) {
      console.error("Hata:", error.message);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  const markAsResolved = async (id) => {
    try {
      await axios.put(`${API_URL}/updateTicket/${id}`, { isResolved: true }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTickets();
    } catch (error) {
      console.error("Tamamlama hatası:", error.message);
    }
  };

  const deleteTicket = async (id) => {
    try {
      await axios.delete(`${API_URL}/deleteTicket/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTickets();
    } catch (error) {
      console.error("Silme hatası:", error.message);
    }
  };

  const columnDefs = [
    { headerName: "Açıklama", field: "description" },
    { headerName: "Durum", field: "status" },
    { headerName: "Kategori", field: "category" },
    { headerName: "Öncelik", field: "priority" },
    {
      headerName: "Oluşturulma Tarihi",
      field: "createdAt",
      valueFormatter: params => {
        const date = new Date(params.value);
        return date.toLocaleString("tr-TR");
      }
    },
    {
      headerName: "İşlemler",
      field: "actions",
      width: 200,
      cellRendererFramework: (params) => (
        <div>
          {!params.data.isResolved && (
            <button onClick={() => markAsResolved(params.data.id)}>Tamamlandı</button>
          )}
          <button onClick={() => deleteTicket(params.data.id)}>Sil</button>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <Sidebar role={role} username={username} />
      <div className="main-grid">
        <div className="form-box">
          <h2>Yeni Talep Oluştur</h2>
          <form onSubmit={handleSubmit}>
            <label>Açıklama</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Talep açıklamasını yazınız..."
              rows="4"
              required
            />

            <label>Kategori</label>
            <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
              <option value="">Kategori Seçin</option>
              {categories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.categoryName}
                </option>
              ))}
            </select>



            <label>Öncelik</label>
            <select value={priorityId} onChange={(e) => setPriorityId(e.target.value)} required>
              <option value="">Öncelik Seçin</option>
              {priorities.map((pri) => (
                <option key={pri.priorityId} value={pri.priorityId}>
                  {pri.priorityName}
                </option>
              ))}
            </select>



            <button type="submit">Gönder</button>
          </form>
        </div>

        <div className="ticket-grid ag-theme-alpine">
          <h3>Mevcut Talepler</h3>
          <AgGridReact
            rowData={tickets}
            modules={[ClientSideRowModelModule]}
            onRowDoubleClicked={(event) => navigate(`/ticket/${event.data.id}`)}
            columnDefs={columnDefs}
            domLayout="autoHeight"
            pagination={true}
            paginationPageSize={5}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketForm;
