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

// Захищений маршрут
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("email");
    localStorage.removeItem("password");
  };

  // Перевіряємо, чи ми на FirstPage (додаємо логіку для '/login' пізніше)
  const isFirstPage = location.pathname === "/home";

  return (
    <>
      {/* Показуємо Header тільки якщо це не FirstPage */}
      {!isFirstPage && <Header />}

      <Routes>
        <Route 
          path="/" 
          element={isAuthenticated ? <Home /> : <Navigate to="/home" />} 
        />

        <Route path="/home" element={<FirstPage />} />

        {/* Додаємо маршрут для логіну */}
        <Route path="/login" element={<Auth />} />

        {/* Захищені маршрути */}
        <Route
          path="/net"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Net />
            </ProtectedRoute>
          }
        />
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

        {/* Перенаправляємо на логін для невідомих маршрутів */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}
