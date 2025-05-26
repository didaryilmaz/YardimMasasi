import { useEffect, useState } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";
import "./ResponseBox.css"; 

const ResponseBox = ({ ticketId }) => {
  const [responses, setResponses] = useState([]);
  const [message, setMessage] = useState("");

  const fetchMessages = async () => {
    if (!ticketId) {
      console.warn("ticketId eksik, mesajlar getirilemedi.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`http://localhost:5094/api/ticket/${ticketId}/responses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Gelen mesajlar:", res.data);
      setResponses(res.data);
    } catch (err) {
      console.error("Mesajlar alınamadı", err);
    }
  };

  const handleSend = async () => {
    if (!ticketId) {
      console.warn("ticketId eksik, mesaj gönderilemedi.");
      return;
    }

    if (!message.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5094/api/ticket/${ticketId}/responses`,
        { response: message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("");
      fetchMessages();
    } catch (err) {
      console.error("Mesaj gönderilemedi", err);
    }
  };

  useEffect(() => {
    if (ticketId) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [ticketId]);

  return (
    <div className="response-box">
      <div className="messages">
        {responses.map((r, index) => (
          <MessageBubble
            key={r.id || index}
            message={r}
            userName={r.userName}
            createdAt={r.createdAt}
          />
        ))}
      </div>
      <div className="input-area">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mesajınızı yazın..."
          disabled={!ticketId}
        />
        <button onClick={handleSend} disabled={!ticketId}>
          Gönder
        </button>
      </div>
    </div>
  );

};

export default ResponseBox;
