import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import Sidebar from "../Components/SideBar";

const AdminSettingsPage = () => {
  const [categories, setCategories] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newPriority, setNewPriority] = useState({ name: "", level: 1 });

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const catRes = await axios.get("http://localhost:5094/api/ticket/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const priRes = await axios.get("http://localhost:5094/api/ticket/priorities", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(catRes.data);
      setPriorities(priRes.data);
    } catch (error) {
      console.error("Veriler alınamadı:", error);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    try {
      await axios.post(
        "http://localhost:5094/api/ticket/categories",
        { categoryName: newCategory },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewCategory("");
      fetchData();
    } catch (error) {
      console.error("Kategori eklenemedi:", error);
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await axios.delete(`http://localhost:5094/api/ticket/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      console.error("Kategori silinemedi:", error);
    }
  };

  const handleAddPriority = async () => {
    if (!newPriority.name.trim()) return;
    try {
      await axios.post(
        "http://localhost:5094/api/ticket/priorities",
        {
          priorityName: newPriority.name,
          priorityLevel: Number(newPriority.level),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNewPriority({ name: "", level: 1 });
      fetchData();
    } catch (error) {
      console.error("Öncelik eklenemedi:", error);
    }
  };

  const handleDeletePriority = async (id) => {
    try {
      await axios.delete(`http://localhost:5094/api/ticket/priorities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (error) {
      console.error("Öncelik silinemedi:", error);
    }
  };

  return (
    <div className="container">
      <Sidebar role={role} username={username} />
      <div className="admin-settings-page">
        <h2>⚙️ Ayarlar</h2>

        <div className="section">
          <h3>Kategoriler</h3>
          <ul>
            {categories.map((cat) => (
              <li key={cat.categoryId}>
                {cat.categoryName}
                <button onClick={() => handleDeleteCategory(cat.categoryId)}>Sil</button>
              </li>
            ))}
          </ul>
          <div className="input-row">
            <input
              type="text"
              placeholder="Yeni kategori"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button onClick={handleAddCategory}>Ekle</button>
          </div>
        </div>

        <div className="section">
          <h3>Öncelikler</h3>
          <ul>
            {priorities.map((pri) => (
              <li key={pri.priorityId}>
                {pri.priorityName} (Seviye: {pri.priorityLevel})
                <button onClick={() => handleDeletePriority(pri.priorityId)}>Sil</button>
              </li>
            ))}
          </ul>
          <div className="input-row">
            <input
              type="text"
              placeholder="Yeni öncelik"
              value={newPriority.name}
              onChange={(e) =>
                setNewPriority({ ...newPriority, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="Seviye"
              value={newPriority.level}
              onChange={(e) =>
                setNewPriority({ ...newPriority, level: e.target.value })
              }
            />
            <button onClick={handleAddPriority}>Ekle</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
