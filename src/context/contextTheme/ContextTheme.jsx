import { createContext, useState } from "react";
// import light from "../../components/Header/Header.module.scss";
// import dark from "../../components/Header/HeaderDark.module.scss";

export const ContextTheme = createContext();

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? prev === "dark" : "light");
    }

    return (
        <ContextTheme.Provider value = {{theme, toggleTheme}}>
            {children}
        </ContextTheme.Provider>
    )
}