import React, { useEffect } from "react";
import styles from "./ProfileDescBar.module.scss";
import { useSelector, useDispatch } from "react-redux";

export default function ProfileDescBar() {
  const profileData = useSelector((state) => state.profile.profileData);

  const location = profileData?.address || "Unknown";
  const profilePicture =
    profileData?.headerPhotoUrl === "" || profileData?.headerPhotoUrl === undefined
      ? "/image/profile/photo_ava_default.png"
      : profileData?.headerPhotoUrl;

  const firstName = profileData?.name || "Unknown";
  const lastName = profileData?.surname || "Unknown";
  const position = profileData?.position || "Unknown";

  const status = profileData?.status
    ? profileData.status.charAt(0).toUpperCase() + profileData.status.slice(1)
    : "Unknown";

  const backgroundUrl =
    profileData?.backgroundImageUrl || "/image/profile/profileBackgroundDefault.svg";

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.imgBackground}
        style={{
          backgroundImage: `url(${backgroundUrl})`,
        }}
      ></div>
      <a className={styles.photoContainer} href="#">
        <img src={profilePicture} alt="avatar" />
      </a>
      <div className={styles.textInfo}>
        <h3 className={styles.name}>
          {firstName} {lastName}
        </h3>
        <div className={styles.additionalInfo}>
          <p className={styles.specialization}>{position}</p>

          <p className={styles.city}>{location}</p>

          <p className={styles.city}>{status}</p>
        </div>

        {/* <button className={styles.experienceBtn}>Experience</button> */}
      </div>
    </div>
  );
}
