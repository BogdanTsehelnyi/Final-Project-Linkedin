import React from "react";
import styles from "./AsideRecommendation.module.scss";
import FollowUnFollowBtn from "../common/FollowUnFollowBtn";

export default function AsideRecommendation({ profileData = [] }) {
  const profilePicture = profileData?.profilePicture || "/image/profile/photo_ava_default.png";

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
            <FollowUnFollowBtn />
          </div>
        </li>
        <li className={styles.usersItemContainer}>
          <a className={styles.userAvatarContainer} href="#">
            <img src={profilePicture} alt="avatar" />
          </a>
          <div className={styles.infoContainer}>
            <p className={styles.userName}>Mykhailo Fedorov</p>
            <p className={styles.userInformation}>Lorem ipsum dolor sit amet consectetur</p>
            <FollowUnFollowBtn />
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
