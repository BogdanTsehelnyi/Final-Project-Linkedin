import React from "react";
import styles from "./ConnectionAside.module.scss";

export default function ConnectionAside() {
  return (
    <div className={styles.connectionWrapper}>
      <a>
        <div className={styles.amountConnections}>
          <p>Connections</p>
          <p>10</p>
        </div>

        <p className={styles.textConnections}>Grow your network</p>
      </a>
    </div>
  );
}
