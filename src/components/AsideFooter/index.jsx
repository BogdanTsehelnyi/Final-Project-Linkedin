import React from "react";
import styles from "./AsideFooter.module.scss";

export default function AsideFooter() {
  return (
    <footer className={styles.compactFooter}>
      <ul className={styles.footerLinksContainer}>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Accessibility</a>
        </li>
        <li>
          <a href="#">Help Center</a>
        </li>
        <li>
          <a className={styles.triangle} href="#">
            Privacy & Terms
          </a>
        </li>
        <li>
          <a href="#">Ad Choices</a>
        </li>
        <li>
          <a href="#">Advertising</a>
        </li>
        <li>
          <a className={styles.triangle} href="#">
            Business Services
          </a>
        </li>
        <li>
          <a href="#">Get the Linkedin app</a>
        </li>
        <li>
          <a href="#">More</a>
        </li>
      </ul>
      <div className={styles.copyrightInfo}>
        <img src="/image/main/Logo.svg" alt="Logo" />
        <p> Linkedin Corporation © 2024</p>
      </div>
    </footer>
  );
}
