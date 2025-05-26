import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage.js";
import RegisterPage from "./Pages/RegisterPage.js";
import MainPage from "./Pages/MainPage.js";
import CreateTicket from "./Pages/CreateTicket.js"; 
import ListTicket from "./Pages/ListTickets.js";
//import TicketDetailWrapper from "./TicketDetailWrapper";
import SupportDashboard from "./Pages/SupportDashboard.js";
//import TicketResponse from "./TicketResponse.js";
import { AuthProvider } from "./context/AuthContext";
import TicketDetailPage from "./Pages/TicketDetailPage.js";
import AdminDashboard from "./Pages/AdminDashboard.js";
import ReportPage from "./Pages/ReportPage.js";
import TicketEditPage from "./Pages/TicketEditPage.js";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function App() {
  return (
    <Router>
      <div className="App">
        <AuthProvider>
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/tickets" element={<CreateTicket />} /> 
              <Route path="/ticket-list" element={<ListTicket />} />
              <Route path="/ticket/:ticketId" element={<TicketDetailPage />} />
              <Route path="/support-dashboard" element={<SupportDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/reports" element={<ReportPage />} />
              <Route path="/edit-ticket/:ticketId" element={<TicketEditPage />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}
//<Route path="/ticket/:ticketId" element={<TicketDetailWrapper />} />
//<Route path="/ticket-detail/:ticketId" element={<TicketResponse />} />
export default App;