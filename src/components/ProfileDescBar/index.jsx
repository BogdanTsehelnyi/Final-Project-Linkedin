import React, { useEffect } from "react";
import styles from "./ProfileDescBar.module.scss";
import { useSelector, useDispatch } from "react-redux";

// import { fetchProfile } from "../../redux/slices/profileSlice";

export default function ProfileDescBar() {
  const profileData = useSelector((state) => state.profile.profileData);
  console.log(profileData);

  const loading = useSelector((state) => state.profile.loading);

  const error = useSelector((state) => state.profile.error);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const country = profileData?.location?.country || "Unknown country";
  const city = profileData?.location?.city || "Unknown city";

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.imgBackground}
        style={{
          backgroundImage: `url(${
            profileData.backgroundImageUrl || "./image/profile/profileBackgroundDefault.svg"
          })`,
        }}
      ></div>
      <a className={styles.photoContainer} href="#">
        <img src={profileData.profilePicture} alt="avatar" />
      </a>
      <div className={styles.textInfo}>
        <h3 className={styles.name}>
          {profileData.firstName} {profileData.lastName}
        </h3>

        <p className={styles.education}>
          Attended National Technical University of Ukraine 'Kyiv Polytechnic Institute​
        </p>
        <p className={styles.city}>
          {country}, {city}
        </p>

        <button className={styles.experienceBtn}>Experience</button>
      </div>
    </div>
  );
}
