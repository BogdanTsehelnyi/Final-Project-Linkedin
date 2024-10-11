import React from "react";
import styles from "./PageWrapper.module.scss";

export default function PageWrapper({ children }) {
  return <main className={styles.wrapper}>{children}</main>;
}
