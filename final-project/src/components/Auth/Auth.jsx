import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { setEmail, setPassword, register, login } from '../../redux/slices/authSlice';
import './Auth.css';
import google_img from './images-login/G+.svg'

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { email, password, error, isAuthenticated } = useSelector((state) => state.auth);
  const [isRegistering, setIsRegistering] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState(''); //  подтверждения пароля
  const [rememberMe, setRememberMe] = useState(false); //  "Remember me"
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
        
        const response = await axios.post('http://localhost:9000/api/auth', {
          email,
          password,
        });
        console.log('Registration successful:', response.data);
        dispatch(register()); 
      } catch (error) {
        console.error('Ошибка регистрации:', error);
        setServerError('Ошибка регистрации. Попробуйте снова.');
      }
    } else {
      try {
        
        const response = await axios.post(
          'http://localhost:9000/api/login',
          {
            username: email,
            password,
            'remember-me': rememberMe,
          },
          {
            headers: {
              'Content-Type': 'application/json', 
            },
            withCredentials: true, 
          }
        );
        console.log('Login successful:', response.data);
        dispatch(login()); 
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
      navigate('/'); //  перенаправляем на главную
    }
  }, [isAuthenticated, email, password, navigate]);

  return (
    <div className="auth-container">
      {isAuthenticated ? (
        <h2>Ви успішно {isRegistering ? 'зареєстровані' : 'авторизовані'}!</h2>
      ) : (
        <form onSubmit={handleSubmit} className="auth-form">
          <h2>{isRegistering ? 'Реєстрація' : 'Авторизація'}</h2>
          <div className="form-group">
            <label htmlFor="email" className='input-emeil'>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
              placeholder="Введіть email"
              required
              className='input-defolt'
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className='input-emeil'>Пароль</label>
            <input
              className='input-password input-defolt'
              type="password"
              id="password"
              value={password}
              onChange={(e) => dispatch(setPassword(e.target.value))}
              placeholder="Введіть пароль"
              required
            />
          </div>
          {isRegistering && (
            <div className="form-group">
              <label htmlFor="confirmPassword" className='input-emeil'>Пароль</label>
              <input
               className='input-defolt input-password '
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторіть пароль"
                required
              />
            </div>
          )}
          {!isRegistering && (
            <div className="form-group">
              <label className='remember-label'>
              Remember me
                <input
                  className='checkbox'
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
               
              </label>
            </div>
          )}
          {error && <p className="error">{error}</p>}
          {serverError && <p className="error">{serverError}</p>}
          <button type="submit" className='submit-button'> {isRegistering ? 'Зареєструватися' : 'Увійти'}</button>
          {!isRegistering && (
            <button
            className='gogle-button'
              type="button"
              onClick={() => {
                window.location.href = 'http://localhost:9000/oauth2/authorization/google';
              }}
            >
              Вхід за допомогою Google <img src={google_img}></img>
            </button>
          )}
          <p onClick={() => setIsRegistering(!isRegistering)} className="toggle">
            {isRegistering ? (
              'Уже маєте акаунт? Увійдіть'
            ) : (
            <>
             Немає акаунта? <span className="highlight">Зареєструйтеся</span>
           </>
            )}
          </p>
          {!isRegistering && (
            <p>
              <a href="/forgot-password" className='highlight'>Забыли пароль?</a>
            </p>
          )}
        </form>
      )}
    </div>
  );
};


export default Auth;
