import { Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./redux/slices/authSlice";
import Auth from "./components/Auth/Auth";
import Home from "./pages/Home";
import Net from "./pages/Net/Net";
import Jobs from "./pages/Jobs";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Profile from "../src/pages/Profile/Profile";
import Header from "./components/Header";
import FirstPage from "./pages/FirstPage/FirstPage";
import { useState, useEffect } from "react";
import HeaderMobile from "./components/HeaderMobile";
import RegistrationFormPage from "./pages/RegistrationFormPage/RegistrationFormPage";
import AnotherProfilePage from "./pages/AnotherProfilePage/AnotherProfilePage";
import ResetPassword from "./components/Auth/ResetPassword";
import ForgotPassword from "./components/Auth/ForgotPassword";

// Захищений маршрут
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [widthWindow, setWidthWindow] = useState(window.innerWidth);
  // console.log(widthWindow);

  useEffect(() => {
    const resizeWidth = () => {
      // console.log(window.innerWidth);

      setWidthWindow(window.innerWidth);
    };

    window.addEventListener("resize", resizeWidth);

    return () => {
      window.removeEventListener("resize", resizeWidth);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  };

  // Перевіряємо, чи ми на FirstPage

  const isFirstPage = location.pathname === "/";

  const isRegistrationFormPage = location.pathname === "/registration";
  const isAuth = location.pathname === "/login";

  return (
    <>
      {!isFirstPage && isRegistrationFormPage && isAuth && <Header />}
      {/* Показуємо Header тільки якщо це не FirstPage */}
      {!isFirstPage && <Header />}
      {!isFirstPage && widthWindow < 911 && <HeaderMobile />}

      <Routes>
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route path="/registration" element={<RegistrationFormPage />} />

        <Route path="/" element={<FirstPage />} />

        {/* местами поменяй назат  element={<FirstPage />} */}
        {/* Додаємо маршрут для логіну */}
        <Route path="/login" element={<Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/password-reset" element={<ResetPassword />} />
        {/* Захищені маршрути */}
        <Route
          path="/net"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Net />
            </ProtectedRoute>
          }
        />
        <Route path="/messages/chat/:id" element={<Messages />} />
        <Route
          path="/jobs"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Jobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/messages"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/friend/:friendId"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <AnotherProfilePage />
            </ProtectedRoute>
          }
        />
        {/* Перенаправляємо на логін для невідомих маршрутів */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}
