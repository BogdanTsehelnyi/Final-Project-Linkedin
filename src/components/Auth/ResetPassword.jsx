import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  // Получение токена из query-параметров
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  console.log("token", token);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      const response = await axios.post(
        `https://final-project-link.onrender.com/password-reset?token=${token}`,
        { password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Ошибка сброса пароля");
      }
    } catch (err) {
      setError("Токен не валиден или истек");
    }
  };

  return (
    <div>
      <h2>Сброс пароля</h2>
      {success ? (
        <p>Пароль успешно изменён! Перенаправление на страницу входа...</p>
      ) : (
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="Новый пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button type="submit">Сбросить пароль</button>
          {error && <p className="error">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
