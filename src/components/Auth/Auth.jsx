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
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 

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
        navigate('/login'); 
      } catch (error) {
        console.error('Ошибка регистрации:', error);
        setServerError('Ошибка регистрации. Попробуйте снова.');
      }
    } else {
      try {
        const response = await axios.post(
          'https://final-project-link.onrender.com/login',
          qs.stringify({ username: email, password, 'remember-me': rememberMe }),
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
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
          className="input-defolt input-emeil"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
          required
        />

      
        <div className='container-pasword'>
          <input
            className="input-defolt"
            type={showPassword ? 'text' : 'password'} 
            placeholder="Пароль"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className='password-toggle-btn'
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {isRegistering && (
          <div className='container-pasword'>
            <input
              className="input-defolt"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Подтвердите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='password-toggle-btn'
            >
              {showConfirmPassword ? '🙈' : '👁️'}
            </button>
          </div>
        )}
        {!isRegistering && (
          <label className="remember-label">
            Remember me
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </label>
        )}
        {serverError && <p className="error">{serverError}</p>}
        <button className="submit-button" type="submit">
          {isRegistering ? 'Зарегистрироваться' : 'Войти'}
        </button>
        {!isRegistering && (
          <button
            type="button"
            className="gogle-button"
            onClick={() => {
              console.log('Перенаправляем на Google OAuth');
              window.location.href = 'https://final-project-link.onrender.com/oauth2/authorization/google';
            }}
          >
            Вход через Google <img src={google_img} alt="Google Login" />
          </button>
        )}
        <hr className="auth-line"></hr>
        <p onClick={() => setIsRegistering(!isRegistering)} className="toggle">
          {isRegistering ? 'Вже маєте аккаунт? Увійти' : 'Немає акаунта? Зареєструватися'}
        </p>
        {!isRegistering && (
          <p className="highlight ">
            <a href="/forgot-password">Забыли пароль?</a>
          </p>
        )}
      </form>
    </div>
  );
};

export default Auth;
