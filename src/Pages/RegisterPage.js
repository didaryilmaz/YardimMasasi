import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';

const RegisterPage = () => {
    const [name, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('User'); 
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        const payload = { name, password, role };

        console.log('Gönderilen veri:', payload);

        const response = await fetch('http://localhost:5094/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            alert('Kayıt başarılı!');
            navigate('/login');
        } else {
            const data = await response.json();
            alert(`Kayıt hatası: ${data}`);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Kayıt Ol</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="username">Kullanıcı Adı</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Kullanıcı Adı"
                        value={name}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Şifre</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="role">Rol</label>
                    <select
                        id="role"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        required
                    >
                        <option value="User">Kullanıcı</option>
                        <option value="Admin">Admin</option>
                        <option value="Destek">Destek</option>
                    </select>
                    <button type="submit">Kayıt Ol</button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
