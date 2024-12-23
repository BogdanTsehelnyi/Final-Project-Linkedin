import { useContext, useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import HeaderMobile from "./components/HeaderMobile";
import { useDispatch } from "react-redux";

import { ContextTheme } from "./context/contextTheme/ContextTheme";

function App() {
  const dispatch = useDispatch();

  const { theme } = useContext(ContextTheme);
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
