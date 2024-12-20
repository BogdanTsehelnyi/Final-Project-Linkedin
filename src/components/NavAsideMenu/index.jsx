import React from "react";
import styles from "./NavAsideMenu.module.scss";

export default function NavAsideMenu() {
  return (
    <nav className={styles.profileNavWrapper}>
      <ul className={styles.linkItems}>
        <li>
          <a className={styles.savedLink} href="#">
            <img src="/image/profile/savedIcon.svg" alt="saved icon" />
            <span> Saved items</span>
          </a>
        </li>
        <li>
          <a className={styles.groupsLink} href="#">
            <img src="/image/profile/group.svg" alt="saved icon" />
            <span> Groups</span>
          </a>
        </li>
        <li>
          <a className={styles.eventsLink} href="#">
            <img src="/image/profile/events.svg" alt="saved icon" />
            <span> Events</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
