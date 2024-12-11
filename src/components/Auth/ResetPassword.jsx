import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './Auth.css';
// коміт 10.12.2024 11:59
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Глазок для пароля
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Глазок для подтверждения пароля


  const location = useLocation();
  const navigate = useNavigate();

  // Получение токена из query-параметров

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    try {
      const response = await axios.post(
        `https://final-project-link.onrender.com/password-reset?token=${token}`,
        { password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError('Ошибка сброса пароля');
      }
    } catch (err) {
      setError('Токен не валиден или истек');
    }
  };

  return (
    <div  className='auth-container'>
      
      {success ? (
        <p>Пароль успешно изменён! Перенаправление на страницу входа...</p>
      ) : (
        <form onSubmit={handleResetPassword}>
            <h2>Сброс пароля</h2>

            <div style={{ position: 'relative' }}> 
          <input
          className="input-reset__pasword"
          type={showPassword ? 'text' : 'password'} 
          placeholder="Новый пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-btn"
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <div style={{ position: 'relative' }}>
          <input
           className="input-reset__pasword"
           type={showConfirmPassword ? 'text' : 'password'} // Управление видимостью
           placeholder="Подтвердите пароль"
           value={confirmPassword}
           onChange={(e) => setConfirmPassword(e.target.value)}
           required
          />
           <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="password-toggle-btn"
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <button type="submit" className='reset-button'>Сбросить пароль</button>
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
};



export default ResetPassword;
