import { useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./AppRoutes";
import Header from "./components/Header";
import HeaderMobile from "./components/HeaderMobile";

function App() {
  const [widthWindow, setWidthWindow] = useState(window.innerWidth);
  // console.log(widthWindow);
  
  useEffect(() => {
    const resizeWidth = () => setWidthWindow(window.innerWidth);

    window.addEventListener("resize", resizeWidth);

    return () => {
      window.removeEventListener("resize", resizeWidth);
    };
  }, []);
  return (
    <>
      <Header />
      <div className="wrapper">
        <AppRoutes />
      </div>
      {widthWindow <= 911 && <HeaderMobile />}
    </>
  );
}

export default App;
