import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
// import { addFriend, removeFriend } from "../../redux/slices/profileRecommendationSlice"; // Імпортуємо дії
import styles from "./AnotherProfileBar.module.scss";

export default function AnotherProfileBar() {
  const { friendId } = useParams(); // Отримуємо friendId з URL
  console.log("friendId params", friendId);

  const dispatch = useDispatch();
  // const { allProfiles, friendsData, loading, error } = useSelector((state) => state.friend); // Отримуємо всі профілі та список друзів
  const allProfiles = useSelector((state) => state.allProfiles.allProfilesData);

  console.log("allProfiles another profile", allProfiles);

  const userId = useSelector((state) => state.auth.userId);

  // Знаходимо профіль за friendId

  useEffect(() => {
    if (allProfiles.length === 0) {
      console.log("Запит відбувається тільки один раз");

      // Завантажуємо профілі лише якщо вони ще не завантажені
      dispatch(fetchOtherProfiles({ userId: userId, page: 0, limit: 7 }));
    }
  }, [allProfiles.length, dispatch, userId]);

  const friendProfile = allProfiles.find((profile) => profile.profileId == friendId);

  console.log("friendProfile", friendProfile);

  // Перевіряємо, чи цей профіль вже є другом
  // const isFriend = friendsData.some((friend) => friend.id === friendId);

  useEffect(() => {
    console.log("Rendering profile for friendId:", friendId);
    console.log("Friend Profile:", friendProfile);
  }, [friendId, friendProfile]);
  console.log("friendProfile.headerPhotoUrl", friendProfile.headerPhotoUrl);
  return (
    <div className={styles.container}>
      <div className={styles.backgroundProfile}>
        <div className={styles.photoContainer}>
          <img
            src={
              friendProfile.headerPhotoUrl === "" || friendProfile.headerPhotoUrl === undefined
                ? "/image/profile/photo_ava_default.png"
                : friendProfile.headerPhotoUrl
            }
            alt="Профіль"
            className={styles.friendPhoto}
          />
        </div>
      </div>
      <h2 className={styles.nameProfile}>
        {friendProfile.name} {friendProfile.surname}
      </h2>
      <h3 className={styles.professionProfile}>{friendProfile.position}</h3>
      <h3 className={styles.cityProfile}>{friendProfile.address}</h3>

      {/* Відображаємо кнопку для додавання або видалення з друзів */}
      <div className={styles.actionButtons}>
        <button
          className={styles.friendActionBtn}
          // Блокуємо кнопку під час очікування
        >
          Removing
        </button>
        <button
          className={styles.friendActionBtn}
          // Блокуємо кнопку під час очікування
        >
          Posts
        </button>
        <button
          className={styles.friendActionBtn}
          // Блокуємо кнопку під час очікування
        >
          Text message
        </button>
      </div>

      {/* Відображаємо кнопку для додавання або видалення з друзів */}
      {/* <div className={styles.actionButtons}>
        {isFriend ? (
          <button
            onClick={handleRemoveFriend}
            className={styles.friendActionBtn}
            disabled={pendingAction} // Блокуємо кнопку під час очікування
          >
            {pendingAction ? "Removing..." : "Remove"}
          </button>
        ) : (
          <button
            onClick={handleAddFriend}
            className={styles.friendActionBtn}
            disabled={pendingAction} // Блокуємо кнопку під час очікування
          >
            {pendingAction ? "Adding..." : "Establish contact"}
          </button>
        )}
      </div> */}
    </div>
  );
}
