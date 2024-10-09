import React from "react";
import styles from "./ProfileDescBar.module.scss";

export default function ProfileDescBar() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgBackground}></div>
      <a className={styles.avatarContainer} href="#">
        <img
          src=""
          alt="avatar"
        />
      </a>
      <div>
        <h3>Oleh Broshko</h3>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>Kyiv</p>
        <button>experience</button>
      </div>
    </div>
  );
}
