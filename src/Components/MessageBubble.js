import { useAuth } from "../context/AuthContext";

const MessageBubble = ({ message }) => {
  const userName = message.userName || "Bilinmeyen Kullanıcı";
  const formattedDate = message.createdAt
    ? new Date(message.createdAt).toLocaleString()
    : "Tarih yok";

  return (
    <div className="border rounded p-2 mb-2">
      <p className="font-semibold">{userName}</p>
      <p>{message.response}</p>
      <span className="text-xs text-gray-500">{formattedDate}</span>
    </div>
  );
};



export default MessageBubble;
