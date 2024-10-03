import Logo from "../../images/Logo/Logo";
import Search from "../../images/Search";
import Arrow from "../../images/Arrow";
import styles from "./Header.module.scss";
import Home from "../../images/Home";
import Net from "../../images/Net";
import Jobs from "../../images/Jobs";
import Messages from "../../images/Messages";
import Notifications from "../../images/Notifications";
import Profile from "../../images/Profile";
import Work from "../../images/Work";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.searchGroup}>
        <Logo />
        <div className={styles.inputWrapper}>
          <Search />
          <input
            className={styles.search}
            type="text"
            name="search"
            placeholder="Search"
          />
        </div>
      </div>
      <div className={styles.groupTwoWrapper}>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${styles.item} ${isActive ? styles.active : ""}`
            }
          >
            <div className={styles.group}>
              {/* <Active /> */}
              <Home />
            </div>
              <span>Home</span>
          </NavLink>
          <NavLink
            to="/net"
            className={({ isActive }) =>
              `${styles.item} ${isActive ? styles.active : ""}`
            }
          >
            <div className={styles.group}>
              {/* <Active /> */}
              <Net />
            </div>
            Net
          </NavLink>
          <NavLink
            to="/jobs"
            className={({ isActive }) =>
              `${styles.item} ${isActive ? styles.active : ""}`
            }
          >
            <div className={styles.group}>
              {/* <Active /> */}
              <Jobs />
            </div>
            Jobs
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `${styles.item} ${isActive ? styles.active : ""}`
            }
          >
            <div className={styles.group}>
              {/* <Active /> */}
              <Messages />
            </div>
            Messages
          </NavLink>
          <NavLink
            to="/notifications"
            className={({ isActive }) =>
              `${styles.item} ${isActive ? styles.active : ""}`
            }
          >
            <div className={styles.group}>
              {/* <Active /> */}
              <Notifications />
            </div>
            Notifications
          </NavLink>
          <NavLink to="/profile" className={styles.item}>
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
        </nav>
      </div>
    </header>
  );
}
