import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addFriend, removeFriend } from "../../redux/slices/profileRecommendationSlice";
import { useNavigate } from "react-router-dom";
import styles from "./AnotherProfiles.module.scss";
import { fetchOtherProfiles } from "../../redux/slices/profileRecommendationSlice";
import { useEffect } from "react";
import { all } from "axios";
import FollowUnFollowBtn from "../common/FollowUnFollowBtn";

export default function AnotherProfiles() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.userId);

  useEffect(() => {
    if (allProfiles.length === 0) {
      // Завантажуємо профілі лише якщо вони ще не завантажені
      dispatch(fetchOtherProfiles({ userId: userId, page: 0, limit: 7 }));
    }
  }, [dispatch, userId]);

  const allProfiles = useSelector((state) => state.profileRecommendation.allProfiles);
  console.log("allProfiles", allProfiles);

  const isRecommedationProfileLoading = useSelector((state) => state.profileRecommendation.loading);
  console.log(isRecommedationProfileLoading);

  //   const friendsData = useSelector((state) => state.friend.friendsData);

  //   const [pendingProfiles, setPendingProfiles] = useState({});

  //   const handleAddFriend = (profile) => {
  //     const existingFriend = friendsData.find((friend) => friend.id === profile.id);
  //     if (!existingFriend) {
  //       setPendingProfiles((prev) => ({ ...prev, [profile.id]: true }));
  //       dispatch(addFriend(profile)).finally(() => {
  //         setPendingProfiles((prev) => ({ ...prev, [profile.id]: false }));
  //       });
  //     }
  //   };

  //   const handleRemoveFriend = (profileId) => {
  //     setPendingProfiles((prev) => ({ ...prev, [profileId]: true }));
  //     dispatch(removeFriend(profileId)).finally(() => {
  //       setPendingProfiles((prev) => ({ ...prev, [profileId]: false }));
  //     });
  //   };

  const handleNavigateToProfile = (id) => {
    navigate(`/friend/${id}`); // Навігація на сторінку профілю за ID
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.anotherProfileTitle}>Another profile for you</h3>
      <div className={styles.profileContainer}>
        <a className={styles.photoContainer} href="#">
          <img
            className={styles.anotherProfilePhoto}
            src="./image/profile/photo_ava_default.png"
            alt=""
          />
        </a>
        <div className={styles.profileInfo}>
          <h3 className={styles.profileName}>Oleg Broshko</h3>
          <p className={styles.profileHeadline}>Developer</p>
          <FollowUnFollowBtn />
        </div>
      </div>

      {/* {allProfiles.map((profile) => (
        <div className={styles.profileContainer} key={profile.userId}>
         

          <div className={styles.anotherProfilePhotoContainer}>
            <img
              className={styles.anotherProfilePhoto}
              src={
                !isRecommedationProfileLoading && profile.headerPhotoUrl !== ""
                  ? profile.headerPhotoUrl
                  : "./image/profile/photo_ava_default.png"
              }
              alt="profile"
              onClick={() => handleNavigateToProfile(profile.id)} // Викликаємо навігацію
            />
          </div>
          <div className={styles.profileInfo}>
            <h3 className={styles.profileName}>
              {!isRecommedationProfileLoading ? `${profile.name} ${profile.surname}` : "loading..."}
            </h3>
            <p className={styles.profileHeadline}>
              {!isRecommedationProfileLoading ? profile.position : "loading"}
            </p>
            <FollowUnFollowBtn /> */}
      {/* Перевіряємо, чи вже доданий профіль у список друзів */}
      {/* {friendsData.some(friend => friend.id === profile.id) ? (
                            <button
                                onClick={() => handleRemoveFriend(profile.id)}  // Видаляємо друга
                                className={styles.anotherProfileBtn}
                                disabled={pendingProfiles[profile.id]}
                            >
                                {pendingProfiles[profile.id] ? "Removing..." : "Cancel Contact"}
                            </button>
                        ) : (
                            <button
                                onClick={() => handleAddFriend(profile)}  // Додаємо друга
                                className={styles.anotherProfileBtn}
                                disabled={pendingProfiles[profile.id]}
                            >
                                {pendingProfiles[profile.id] ? "Adding..." : "Establish contact"}
                            </button>
                        )} */}
      {/* </div>
        </div>
      ))} */}
    </div>
  );
}
