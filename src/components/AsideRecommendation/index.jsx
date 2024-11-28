import React from "react";
import styles from "./AsideRecommendation.module.scss";

export default function AsideRecommendation({ profileData = [] }) {
  return (
    <div className={styles.recommendationsContainer}>
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Add to your feed </h2>
        <button className={styles.excludeBtn}></button>
      </div>
      <ul className={styles.usersListContainer}>
        <li className={styles.usersItemContainer}>
          <a className={styles.userAvatarContainer} href="#">
            <img src={profileData.profilePicture} alt="avatar" />
          </a>
          <div className={styles.infoContainer}>
            <p className={styles.userName}>Mykhailo Fedorov</p>
            <p className={styles.userInformation}>Lorem ipsum dolor sit amet consectetur</p>
            <button className={styles.followBtn}>Follow</button>
          </div>
        </li>
        <li className={styles.usersItemContainer}>
          <a className={styles.userAvatarContainer} href="#">
            <img src={profileData.profilePicture} alt="avatar" />
          </a>
          <div className={styles.infoContainer}>
            <p className={styles.userName}>Mykhailo Fedorov</p>
            <p className={styles.userInformation}>Lorem ipsum dolor sit amet consectetur</p>
            <button className={styles.followBtn}>Follow</button>
          </div>
        </li>
      </ul>
      <a className={styles.showMoreLink}>
        <p>See all recommendation</p>
        <span></span>
      </a>
    </div>
  );
}
