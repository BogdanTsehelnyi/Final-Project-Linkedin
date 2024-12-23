import Logo from "../../images/Logo/Logo";
import Search from "../../images/Search";
import Arrow from "../../images/Arrow";
import light from "./Header.module.scss";
import dark from "./HeaderDark.module.scss";
import Home from "../../images/Home";
import Net from "../../images/Net";
import Jobs from "../../images/Jobs";
import Messages from "../../images/Messages";
import Notifications from "../../images/Notifications";
import Profile from "../../images/Profile";
import Work from "../../images/Work";
import { NavLink } from "react-router-dom";
import classNames from "classnames";
import { useState, useEffect, useContext } from "react";
import { ContextTheme } from "../../context/contextTheme/ContextTheme";

export default function Header() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [focus, setFocus] = useState(false);
  const { theme, toggleTheme } = useContext(ContextTheme);

  const styles = theme === "light" ? light : dark;

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(saved);
  }, []);

  const handleHistory = () => {
    const update = [value, ...history].slice(0, 3);
    localStorage.setItem("history", JSON.stringify(update));
    setHistory(update);
    setValue("");
  };

  const handleEnterKey = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleHistory();
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleFocus = () => {
    setFocus(true);
  };
  const handleBlur = () => {
    setFocus(false);
  };
  return (
    <header className={styles.wrapper}>
      <Messages className={styles.mess} />
      <div className={styles.searchGroup}>
        <Logo className={styles.name} />
        <div className={styles.inputWrapper}>
          {/* <Search /> */}
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleEnterKey}
            value={value}
            onChange={handleChange}
            className={classNames(styles.search, styles.displaySearch)}
            type="text"
            name="search"
            placeholder="Search"
          />
        </div>
        {focus && history.length > 0 && (
          <div className={styles.wrapperFocus}>
            <ul className={styles.focusModal}>
              <span className={styles.headingFocus}>Recent searches</span>
              {history.map((item, index) => (
                <li className={styles.items} key={index}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className={styles.groupTwoWrapper}>
        <nav className={styles.nav}>
          <NavLink
            to="/home"
            className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ""}`}
          >
            <div className={styles.group}>
              <Home />
            </div>
            <span>Home</span>
          </NavLink>
          <NavLink
            to="/net"
            className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ""}`}
          >
            <div className={styles.group}>
              <Net />
            </div>
            Net
          </NavLink>
          {/* <NavLink
            to="/jobs"
            className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ""}`}
          >
            <div className={styles.group}>
              <Jobs />
            </div>
            Jobs
          </NavLink> */}
          <NavLink
            to="/messages"
            className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ""}`}
          >
            <div className={styles.group}>
              <Messages className={styles.mes} />
              {/* <div className={styles.new}>1</div> */}
            </div>
            Messages
          </NavLink>
          <NavLink
            to="/notifications"
            className={({ isActive }) => `${styles.item} ${isActive ? styles.active : ""}`}
          >
            {/*  <div className={styles.group}>
              <Notifications />
            </div>
            Notifications*/}
          </NavLink>
          <NavLink to="/profile" className={classNames(styles.item, styles.itemDisplay)}>
            <Profile />
            <div className={styles.arr}>
              <span>Profile</span>
              <Arrow />
            </div>
          </NavLink>
          <div className={styles.item}>
            <Work />
            <div className={styles.arr}>
              <span>For work</span>
              <Arrow />
            </div>
          </div>
          <div className={styles.item}>
            <p className={styles.prem}>Try Premium for free</p>
          </div>
          <button onClick={toggleTheme} className={styles.switchTheme}></button>
        </nav>
      </div>
    </header>
  );
}
