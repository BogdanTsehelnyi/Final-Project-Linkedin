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
  const { profileData } = useSelector((state) => state.profile);
  const profileLoading = useSelector((state) => state.profile.loading);

  const [isRegistering, setIsRegistering] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

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
            const authResult =  dispatch(fetchAuthorization({ email, password }));



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
      <form  onSubmit={(e)=>handleSubmit(e)} className="auth-form">
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
            placeholder="Підтвердіть пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        )}

        {!isRegistering && (
          <label>
            Запам'ятати мене
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
          </label>
        )}

        {error && <p className="error">{error}</p>}

        <button type="submit">{isRegistering ? "Зареєструватися" : "Увійти"}</button>

        {!isRegistering && (
          <button
            type="button"
            onClick={() =>
              (window.location.href =
                "https://final-project-link.onrender.com/oauth2/authorization/google")
            }
          >
            Вхід через Google <img src={google_img} alt="Google Login" />
          </button>
        )}

        <p onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Вже маєте акаунт? Увійти" : "Немає акаунта? Зареєструватися"}
        </p>

        {!isRegistering && (
          <p>
            <a href="/forgot-password">Забули пароль?</a>
          </p>
        )}
      </form>
    </div>
  );
};

export default Auth;
