import AnotherProfileBar from "../../components/AnotherProfileBar";
import styles from "./AnotherProfilePage.module.scss";

export default function AnotherProfilePage() {
  return (
    <>
      <div className={styles.anotherProfileBox}>
        <AnotherProfileBar />
        <div className={styles.fixedImg}>
          <img src="/image/main/fixedImg.png" alt="" />
        </div>
      </div>
    </>
  );
}
