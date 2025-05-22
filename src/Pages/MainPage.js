import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className="main-container">
      <h1 className="main-title">Yardım Masası Uygulamasına Hoş Geldiniz</h1>
      <div className="button-group">
        <button className="main-button" onClick={() => navigate('/login')}>Giriş Yap</button>
        <button className="main-button" onClick={() => navigate('/register')}>Kayıt Ol</button>
      </div>
    </div>
  );
};

export default MainPage;
