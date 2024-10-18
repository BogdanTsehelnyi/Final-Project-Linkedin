import { useSelector } from "react-redux";
import styles from "./Profile.module.scss";

export default function Profile() {
  const profilePicture = useSelector((state) => state.profile.profileData.profilePicture);


  return <div className={styles.wrapper}>
    <img src={profilePicture} alt="Профіль" />
  </div>;
}
