import React from "react";
import styles from "./AsideRecommendation.module.scss";
import ShowMoreBtn from "../common/ShowMoreBtn";

export default function AsideRecommendation({ profileData = [] }) {
  const profilePicture =
    profileData?.headerPhotoUrl === "" || profileData?.headerPhotoUrl === undefined
      ? "/image/profile/photo_ava_default.png"
      : profileData?.headerPhotoUrl;

  profileData?.backgroundImageUrl || "/image/profile/profileBackgroundDefault.svg";

  return (
    <div className={styles.recommendationsContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Add to your feed </h2>
        <button className={styles.excludeBtn}></button>
      </div>
      <ul className={styles.usersListContainer}>
        <li className={styles.usersItemContainer}>
          <a className={styles.userAvatarContainer} href="#">
            <img src={profilePicture} alt="avatar" />
          </a>
          <div className={styles.infoContainer}>
            <p className={styles.userName}>Mykhailo Fedorov</p>
            <p className={styles.userInformation}>Lorem ipsum dolor sit amet consectetur</p>
          </div>
        </li>
        <li className={styles.usersItemContainer}>
          <a className={styles.userAvatarContainer} href="#">
            <img src={profilePicture} alt="avatar" />
          </a>
          <div className={styles.infoContainer}>
            <p className={styles.userName}>Mykhailo Fedorov</p>
            <p className={styles.userInformation}>Lorem ipsum dolor sit amet consectetur</p>
          </div>
        </li>
      </ul>
      <ShowMoreBtn />
    </div>
  );
}
