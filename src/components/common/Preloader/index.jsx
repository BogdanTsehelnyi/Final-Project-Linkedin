import React from "react";
import styles from "./Preloader.module.scss";

export default function Preloader() {
  return (
    <div className={styles.preloaderWrapper}>
      <span className={styles.loader}></span>
    </div>
  );
}
