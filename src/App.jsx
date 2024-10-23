import { useContext, useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import HeaderMobile from "./components/HeaderMobile";
import { useDispatch } from "react-redux";
import { fetchCarts } from "./redux/slices/friendProfileSlice";
import { fetchProfile } from "./redux/slices/profileSlice";
import { ContextTheme } from "./context/contextTheme/ContextTheme";

function App() {
  // const [widthWindow, setWidthWindow] = useState(window.innerWidth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfile()); // Завантажуємо дані профілю при рендері
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);

  // useEffect(() => {
  //   const resizeWidth = () => setWidthWindow(window.innerWidth);

  //   window.addEventListener("resize", resizeWidth);

  //   return () => {
  //     window.removeEventListener("resize", resizeWidth);
  //   };
  // }, []);

  const {theme} = useContext(ContextTheme);
  return (
    <>
        <div className="wrapper" style={{ backgroundColor: theme === "light" ? "#fff" : "#3a3939" }}>
          <AppRoutes />
        </div>
        {/* {widthWindow <= 911 && <HeaderMobile />} */}
    </>
  );
}

export default App;
