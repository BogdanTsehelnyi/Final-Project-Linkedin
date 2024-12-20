import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addFriend, removeFriend } from "../../redux/slices/profileRecommendationSlice";
import { useNavigate } from "react-router-dom";
import styles from "./AnotherProfiles.module.scss";
import { useEffect } from "react";
import FollowUnFollowBtn from "../common/FollowUnFollowBtn";
import { fetchOtherProfiles } from "../../redux/slices/otherProfilesSlice";

export default function AnotherProfiles() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.userId);
  const allProfiles = useSelector((state) => state.allProfiles.allProfilesData);

  useEffect(() => {
    if (allProfiles.length === 0) {
      console.log("Запит відбувається тільки один раз");

      // Завантажуємо профілі лише якщо вони ще не завантажені
      dispatch(fetchOtherProfiles({ userId: userId, page: 0, limit: 7 }));
    }
  }, [allProfiles.length, dispatch, userId]);

  console.log("allProfiles", allProfiles);

  const isProfilesLoading = useSelector((state) => state.allProfiles.loading);
  console.log(isProfilesLoading);

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
      <ul className={styles.profileList}>
        {allProfiles.map((profile) => (
          <li className={styles.profileItem} key={profile.profileId}>
            <div
              className={styles.photoContainer}
              onClick={() => handleNavigateToProfile(profile.profileId)}
            >
              <img
                className={styles.anotherProfilePhoto}
                src={profile.headerPhotoUrl || "/image/profile/photo_ava_default.png"}
                alt={`${profile.name} ${profile.surname}`}
              />
            </div>
            <div className={styles.profileInfo}>
              <h3 className={styles.profileName}>
                {isProfilesLoading ? "loading..." : `${profile.name} ${profile.surname}`}
              </h3>
              <p className={styles.profilePosition}>
                {isProfilesLoading ? "loading..." : profile.position}
              </p>
              <FollowUnFollowBtn />
            </div>
          </li>
        ))}
      </ul>

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
