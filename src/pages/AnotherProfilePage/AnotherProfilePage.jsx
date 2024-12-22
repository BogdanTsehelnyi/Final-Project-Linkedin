import AnotherProfileBar from "../../components/AnotherProfileBar";
import AnotherProfiles from "../../components/AnotherProfiles";
import styles from "./AnotherProfilePage.module.scss";
import ProfileFooter from "../../components/ProfileFooter";

export default function AnotherProfilePage() {
  return (
    <>
      <div className={styles.anotherProfileBox}>
        <AnotherProfileBar />
        <AnotherProfiles />
      </div>
      <ProfileFooter />
    </>
  );
}
