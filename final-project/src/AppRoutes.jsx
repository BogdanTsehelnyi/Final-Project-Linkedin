import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './redux/slices/authSlice';
import Auth from './components/Auth';
import Home from "./pages/Home";
import Net from "./pages/Net/Net";
import Jobs from "./pages/Jobs";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Profile from "../src/pages/Profile/Profile";

// Захищений маршрут
const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('email'); 
    localStorage.removeItem('password'); 
  };

  return (
    <Routes>
      {/* Маршрут для сторінки логіну */}
      <Route path="/login" element={<Auth />} />

      {/* Захищені маршрути */}
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <Home />
          </ProtectedRoute>
        }
      />

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

      {/* Захищена головна сторінка з опцією вийти з акаунта */}
      <Route
        path="/"
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <div>
              <h1>Головна сторінка</h1>
              <p>Ви успішно увійшли в систему.</p>
              <Link to="/login" onClick={handleLogout}>Вийти з акаунта</Link>
            </div>
          </ProtectedRoute>
        }
      />

      {/* Перенаправлення на логін для всіх невідомих маршрутів */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
