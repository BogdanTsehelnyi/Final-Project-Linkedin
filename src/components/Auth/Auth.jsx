import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setEmail,
  setPassword,
  fetchRegistration,
  fetchAuthorization,
} from "../../redux/slices/authSlice";
import { fetchProfileByUserId } from "../../redux/slices/profileSlice";
import "./Auth.css";
import google_img from "./images-login/G+.svg";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password, error, isAuthenticated, userId, isVerified } = useSelector(
    (state) => state.auth
  );

  const profileLoading = useSelector((state) => state.profile.loading);

  const [isRegistering, setIsRegistering] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const { profileData } = useSelector((state) => state.profile);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // Глазок для пароля
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Глазок для подтверждения пароля

  // Завантаження профілю користувача
  useEffect(() => {
    if (userId) {
      dispatch(fetchProfileByUserId(userId));
    }
  }, [dispatch, userId]);

  // Перевірка локального збереження email і пароля
  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    if (storedEmail && storedPassword) {
      dispatch(setEmail(storedEmail));
      dispatch(setPassword(storedPassword));
      setIsRegistering(false);
    }
  }, [dispatch]);

  // Збереження email і пароля після успішної авторизації
  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    }
  }, [isAuthenticated, email, password]);

  // Обробка сабміту форми
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegistering) {
        if (password !== confirmPassword) {
          alert("Паролі не співпадають");
          return;
        }

        const registrationResult = await dispatch(fetchRegistration({ email, password })).unwrap();

        if (registrationResult.meta.requestStatus === "fulfilled") {
          alert("Перевірте свою електронну пошту для підтвердження.");

          // Цикл перевірки підтвердження
          let isUserVerified = false;
          while (!isUserVerified) {
            const authResult = dispatch(fetchAuthorization({ email, password }));

            if (authResult.meta.requestStatus === "fulfilled") {
              isUserVerified = authResult.payload.isVerified;

              if (isUserVerified) {
                alert("Електронна пошта підтверджена!");
                navigate("/dashboard"); // Перехід на захищену сторінку
              } else {
                alert("Будь ласка, підтвердьте свою електронну пошту.");
              }
            } else {
              alert("Помилка авторизації: " + authResult.payload);
              break;
            }
          }
        } else {
          alert("Помилка реєстрації: " + registrationResult.payload);
        }
      } else {
        await dispatch(fetchAuthorization({ email, password, rememberMe })).unwrap();

        if (!profileData || Object.keys(profileData).length === 0) {
          console.log("profileData navigate(/registration); ", profileData);

          navigate("/registration");
        } else {
          console.log("profileData navigate(/home); ", profileData);
          navigate("/home");
        }
      }
    } catch (err) {
      console.error("Помилка:", err);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isRegistering ? "Реєстрація" : "Авторизація"}</h2>
        <input
          className="input-defolt input-emeil"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
          required
        />

        <div className="container-pasword">
          <input
            className="input-reset__pasword"
            type={showPassword ? "text" : "password"} // Управление видимостью
            placeholder="Новый пароль"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="password-toggle-btn"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {isRegistering && (
          <div className="container-pasword">
            <input
              className="input-reset__pasword"
              type={showConfirmPassword ? "text" : "password"} // Управление видимостью
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
              {showConfirmPassword ? "🙈" : "👁️"}
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

        {/* Показ сообщения об ошибке */}
        {error && <p className="error">{error}</p>}

        <button className="submit-button" type="submit">
          {isRegistering ? "Зарегистрироваться" : "Войти"}
        </button>
        {!isRegistering && (
          <button
            className="gogle-button"
            type="button"
            onClick={() =>
              (window.location.href =
                "https://final-project-link.onrender.com/oauth2/authorization/google")
            }
          >
            Вход через Google <img src={google_img} alt="Google Login" />
          </button>
        )}
        <hr className="auth-line"></hr>
        <p onClick={() => setIsRegistering(!isRegistering)} className="toggle">
          {isRegistering ? "Уже есть аккаунт? Войти" : "Нет аккаунта? Зарегистрироваться"}
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
