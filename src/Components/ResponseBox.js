import { useEffect, useState } from "react";
import axios from "axios";
import MessageBubble from "./MessageBubble";

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
    <div className="border rounded p-4 flex flex-col h-[400px] overflow-hidden">
      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {responses.map((r, index) => (
          <MessageBubble
            key={r.id || index}
            message={r}
            userName={r.userName}
            createdAt={r.createdAt}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border px-2 py-1 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Mesajınızı yazın..."
          disabled={!ticketId}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded"
          onClick={handleSend}
          disabled={!ticketId}
        >
          Gönder
        </button>
      </div>
    </div>
  );
};

export default ResponseBox;
