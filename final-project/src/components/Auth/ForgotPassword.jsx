import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:9000/api/password-forgot',
        { email },
        {
          headers: {
            'Content-Type': 'application/json', // Изменим на JSON
          },
          withCredentials: true,
        }
      );
      setMessage('Лист для скидання пароля надіслано');
    } catch (error) {
      console.error('Ошибка отправки:', error);
      setMessage('Помилка відновлення пароля');
    }
  };

  return (   
    <form onSubmit={handleSubmit}>
      <h2>Відновлення пароля</h2>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <button type="submit">Відправити</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default ForgotPassword;