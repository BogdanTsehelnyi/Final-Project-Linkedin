import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setEmail,
  setPassword,
  fetchRegistration,
  fetchAuthorization,
} from "../../redux/slices/authSlice";
import "./Auth.css";
import google_img from "./images-login/G+.svg";
import { fetchProfileByUserId } from "../../redux/slices/profileSlice";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password, error, isAuthenticated } = useSelector((state) => state.auth);
  const [isRegistering, setIsRegistering] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { profileData } = useSelector((state) => state.profile);
  const [isProfileLoading, setIsProfileLoading] = useState(true);

  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    if (userId) {
      setIsProfileLoading(true);
      dispatch(fetchProfileByUserId(userId))
        .unwrap()
        .finally(() => setIsProfileLoading(false));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");
    if (storedEmail && storedPassword) {
      dispatch(setEmail(storedEmail));
      dispatch(setPassword(storedPassword));
      setIsRegistering(false);
    }
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegistering) {
      if (password !== confirmPassword) {
        alert("Паролі не співпадають");
        return;
      }

      dispatch(fetchRegistration({ email, password }))
        .unwrap()
        .then(() => navigate("/home"))
        .catch((err) => console.error(err));
    } else {
      dispatch(fetchAuthorization({ email, password, rememberMe }))
        .unwrap()
        .then(() => {
          if (!isProfileLoading) {
            if (!profileData || Object.keys(profileData).length === 0) {
              navigate("/registration");
            } else {
              navigate("/home");
            }
          }
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    }
  }, [isAuthenticated, email, password]);

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isRegistering ? "Реєстрація" : "Авторизація"}</h2>
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
        {error && <p className="error">{error}</p>}
        <button type="submit">{isRegistering ? "Зарегистрироваться" : "Войти"}</button>
        {!isRegistering && (
          <button
            type="button"
            onClick={() =>
              (window.location.href =
                "https://final-project-link.onrender.com/oauth2/authorization/google")
            }
          >
            Вход через Google <img src={google_img} alt="Google Login" />
          </button>
        )}
        <p onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Зарегистрироваться"}
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
