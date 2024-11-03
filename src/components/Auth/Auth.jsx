import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; 
import { setEmail, setPassword, register, login } from '../../redux/slices/authSlice';
import './Auth.css';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { email, password, error, isAuthenticated, isRegistered } = useSelector((state) => state.auth);
  const [isRegistering, setIsRegistering] = useState(true);

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail && storedPassword) {
      dispatch(setEmail(storedEmail));
      dispatch(setPassword(storedPassword));
      setIsRegistering(false); 
    }
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegistering) {
      dispatch(register());
    } else {
      dispatch(login());
    }
  };

  // Виконуємо перенаправлення на /registration після успішної реєстрації
  useEffect(() => {
    if (isRegistered && isRegistering) {
      navigate('/registration');
    }
  }, [isRegistered, isRegistering, navigate]);

  useEffect(() => {
    if (isAuthenticated && !isRegistering) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      navigate('/');
    }
  }, [isAuthenticated, isRegistering, email, password, navigate]);

  return (
    <div className="auth-container">
      {isAuthenticated ? (
        <h2>Ви успішно {isRegistering ? 'зареєстровані' : 'авторизовані'}!</h2>
      ) : (
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>{isRegistering ? 'Реєстрація' : 'Авторизація'}</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              placeholder="Введіть email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              placeholder="Введіть пароль"
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit">{isRegistering ? 'Зареєструватися' : 'Увійти'}</button>
          <p onClick={() => setIsRegistering(!isRegistering)} className="toggle">
            {isRegistering ? 'Уже маєте акаунт? Увійдіть' : 'Немає акаунта? Зареєструйтеся'}
          </p>
        </form>
      )}
    </div>
  );
};

export default Auth;
