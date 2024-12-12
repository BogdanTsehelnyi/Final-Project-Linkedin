import styles from './HeaderMobile.module.scss';
import { NavLink } from 'react-router-dom';
import Home from "../../images/Home";
import Net from "../../images/Net";
import Jobs from "../../images/Jobs";
import Add from "../../images/Add";
import Notifications from "../../images/Notifications";

export default function HeaderMobile() {
  return (
    <div className={styles.wrapper}>
      <NavLink
        to="/home"
        className={({ isActive }) =>
          `${styles.item} ${isActive ? styles.active : ""}`
        }
      >
        <div className={styles.group}>
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
          <Net />
        </div>
        Net
      </NavLink>
      <NavLink
        to="/add"
        className={({ isActive }) =>
          `${styles.item} ${isActive ? styles.active : ""}`
        }
      >
        <div className={styles.group}>
          <Add />
        </div>
        Add
      </NavLink>
      <NavLink
        to="/jobs"
        className={({ isActive }) =>
          `${styles.item} ${isActive ? styles.active : ""}`
        }
      >
        <div className={styles.group}>
          <Jobs />
        </div>
        Jobs
      </NavLink>
      <NavLink
        to="/notifications"
        className={({ isActive }) =>
          `${styles.item} ${isActive ? styles.active : ""}`
        }
      >
        <div className={styles.group}>
          <Notifications />
        </div>
        Notifications
      </NavLink>
    </div>
  );
}
