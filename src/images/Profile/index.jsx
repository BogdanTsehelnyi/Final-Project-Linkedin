import { useSelector } from "react-redux";
import styles from "./Profile.module.scss";

export default function Profile() {
  const profileData = useSelector((state) => state.profile.profileData);
  const profilePicture =
    profileData?.headerPhotoUrl === "" || profileData?.headerPhotoUrl === undefined
      ? "/image/profile/photo_ava_default.png"
      : profileData?.headerPhotoUrl;
  return (
    <div className={styles.wrapper}>
      <img src={profilePicture} alt="Профіль" />
    </div>
  );
}
