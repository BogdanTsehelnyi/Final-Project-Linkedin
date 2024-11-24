import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { setEmail, setPassword, register, login } from '../../redux/slices/authSlice';
import './Auth.css';
import google_img from './images-login/G+.svg';
import qs from 'qs';


const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { email, password, error, isAuthenticated } = useSelector((state) => state.auth);
  const [isRegistering, setIsRegistering] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false); 
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    const storedEmail = localStorage.getItem('email');
    const storedPassword = localStorage.getItem('password');
    if (storedEmail && storedPassword) {
      dispatch(setEmail(storedEmail));
      dispatch(setPassword(storedPassword));
      setIsRegistering(false);
    }
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(''); 

    if (isRegistering) {
      if (password !== confirmPassword) { 
        alert('Паролі не співпадають');
        return;
      }

      try {
        const response = await axios.post('https://final-project-link.onrender.com/auth', {
          email,
          password,
        });
        console.log('Registration successful:', response.data);
        dispatch(register());
        navigate('/login'); // Перенаправляем на страницу входа
      } catch (error) {
        console.error('Ошибка регистрации:', error);
        setServerError('Ошибка регистрации. Попробуйте снова.');
      }
    } else {
      try {
        // Форматируем данные с помощью qs.stringify и меняем заголовок Content-Type
        const response = await axios.post(
          'https://final-project-link.onrender.com/login',
          qs.stringify({ username: email, password, 'remember-me': rememberMe }),  // Преобразуем данные
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },  // Заменяем заголовок
            withCredentials: true,
          }
          
        );
        console.log('Login successful:', response.data);
        dispatch(login());
        navigate('/home');
      } catch (error) {
        console.error('Ошибка входа:', error);
        setServerError('Ошибка входа. Проверьте данные.');
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('email', email);
      localStorage.setItem('password', password);
      navigate('/');
    }
  }, [isAuthenticated, email, password, navigate]);

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isRegistering ? 'Реєстрація' : 'Авторизація'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => dispatch(setPassword(e.target.value))}
          required
        />
        {isRegistering && (
          <input
            type="password"
            placeholder="Подтвердите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}
        {!isRegistering && (
          <label>
            Remember me
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </label>
        )}
        {serverError && <p className="error">{serverError}</p>}
        <button type="submit">{isRegistering ? 'Зарегистрироваться' : 'Войти'}</button>
        {!isRegistering && (
          <button
          type="button"
          onClick={() => {
            console.log('Перенаправляем на Google OAuth');
            window.location.href =  'https://final-project-link.onrender.com/oauth2/authorization/google';
          }}
          >
            Вход через Google <img src={google_img} alt="Google Login" />
          </button>
        )}
        <p onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
        </p>
        {!isRegistering && (
          <p>
            <a href="/forgot-password">Забыли пароль?</a>
          </p>
        )}
      </form>
    </div>
  );
};

export default Auth;