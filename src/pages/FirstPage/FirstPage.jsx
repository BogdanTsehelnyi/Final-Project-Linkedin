import React from "react";
import styles from "./FirstPage.module.scss";
import FirstPageHeader from "../../components/FirstPageHeader";
import FirstPageMain from "../../components/FirstPageMain";

export default function FirstPage() {
    return (
      <div className={styles.firstPageWrapper}>
            <FirstPageHeader />
            <FirstPageMain />
      </div>
    )
  }