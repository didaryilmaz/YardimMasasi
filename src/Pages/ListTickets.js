import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { ClientSideRowModelModule } from 'ag-grid-community';
import { ModuleRegistry } from '@ag-grid-community/core';
import Sidebar from "../Components/SideBar.js";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const ListTickets = () => {
  const [rowData, setRowData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  //Sidebar'da rol ve kullanıcı adını almak için localStorage'dan verileri alıyoruz
  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  const fetchTickets = useCallback(() => {
    fetch("http://localhost:5094/api/Ticket/getAllTicketsByRole", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          if (res.status === 403) {
            throw new Error("Yetkisiz erişim");
          } else {
            throw new Error("Sunucu hatası");
          }
        }
        return res.json();
      })
      .then(data => {
        setRowData(data);
      })
      .catch(err => {
        alert("Ticket verisi alınamadı veya yetkiniz yok.");
        navigate("/login");
      });
  }, [token, navigate]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchTickets();
    }
  }, [token, fetchTickets, navigate]);

  const handleRowClick = (event) => {
    const ticketId = event.data.id;
    navigate(`/ticket-detail/${ticketId}`);
  };

  const columnDefs = [
    { headerName: "ID", field: "id" },
    { headerName: "Kullanıcı ID", field: "userId" },
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
  ];

  return (
    <div className="container">
      <Sidebar role={role} username={username} />

      <div className="main-grid">
        <div className="ticket-grid ag-theme-alpine">
          <h3>Mevcut Talepler</h3>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            modules={[ClientSideRowModelModule]}
            pagination={true}
            paginationPageSize={30}
            domLayout="autoHeight"
            onRowClicked={handleRowClick}
          />
        </div>
      </div>
    </div>
  );
};

export default ListTickets;
