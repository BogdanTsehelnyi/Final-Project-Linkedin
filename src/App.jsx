import { useContext, useEffect } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileById } from "./redux/slices/profileSlice"; // Для глобального завантаження профілю
import { ContextTheme } from "./context/contextTheme/ContextTheme";

function App() {
  const dispatch = useDispatch();
  const { profileData } = useSelector((state) => state.profile);
  const { theme } = useContext(ContextTheme);

  useEffect(() => {
    if (!profileData.profileId) {
      // Замінити на актуальний ID користувача
      const profileId = 1; 
      dispatch(fetchProfileById(profileId)); // Завантаження профілю
    }
  }, [dispatch, profileData.profileId]);

  return (
    <div className="wrapper" style={{ backgroundColor: theme === "light" ? "#fff" : "#3a3939" }}>
      <AppRoutes />
    </div>
  );
}

export default App;
