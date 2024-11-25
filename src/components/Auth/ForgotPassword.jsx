import React, { useState } from 'react';
import axios from 'axios';
import qs from 'qs';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError('');

    try {
      console.log("Отправляем запрос:", { email });

      const response = await axios.post(
        'https://final-project-link.onrender.com/password-forgot',
        qs.stringify({ email }), // Преобразуем данные для сервера
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setMessage('Лист для скидання пароля надіслано');
      } else {
        setError('Ошибка отправки письма');
      }
    } catch (error) {
      console.error('Ошибка отправки:', error.response || error.message);
      setError('Ошибка подключения к серверу');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Восстановление пароля</h2>
      <input
        type="email"
        placeholder="Введите ваш email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Отправить</button>
      {message && <p className="success">{message}</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
};

export default ForgotPassword;



