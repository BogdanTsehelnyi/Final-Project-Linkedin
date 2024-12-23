import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./FriendsProfile.module.scss";
import { useNavigate } from "react-router-dom";
import { fetchQuantitySubscribed, fetchSubscriptions } from "../../redux/slices/subscriptionSlice";
import ButtonMessage from "../ButtonMessage";
import { isDatePickerView } from "@mui/x-date-pickers/internals";
import { useState } from "react";

export default function FriendsProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quantitySubscribed, subscribedData } = useSelector((state) => state.subscription);
  const userId = useSelector((state) => state.auth.userId);
  console.log("subscribedData", subscribedData);
  

  // Завантаження кількості підписок, якщо це значення null
  useEffect(() => {
    if (quantitySubscribed === null) {
      dispatch(fetchQuantitySubscribed(userId));
    }
  }, [dispatch, quantitySubscribed, userId]);

  // Завантаження підписок користувача, якщо кількість підписок була отримана
  useEffect(() => {
    if (quantitySubscribed !== null && quantitySubscribed > 0) {
      dispatch(fetchSubscriptions({ userId, page: 0, size: quantitySubscribed }));
    }
  }, [dispatch, quantitySubscribed, userId]);

  // Переход до профілю друга
  const handleNavigateToProfile = (userId) => {
    navigate(`/profile/${userId}`); // Переходимо на сторінку профілю
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.friendsProfileTitle}>Your Friends</h3>
      {quantitySubscribed > 0 ? (
        subscribedData.map((friend) => (
          <div className={styles.friendContainer} key={friend.userId}>
            <div className={styles.friendBox}>
              <img
                onClick={() => handleNavigateToProfile(friend.userId)}
                className={styles.friendPhoto}
                src={
                  friend.headerPhotoUrl === "" || friend.headerPhotoUrl === undefined
                    ? "/image/profile/photo_ava_default.png"
                    : friend.headerPhotoUrl
                }
                alt="profile"
              />
              <div className={styles.friendInfo}>
                <h3 className={styles.friendName}>
                  {friend.name} {friend.surname}
                </h3>
              </div>
            </div>
            <div className={styles.btnBox}>
              {/* <button
                className={styles.friendBtn}
                onClick={() => console.log("Message to", friend.name)}
              >
                Message
              </button> */}
              <ButtonMessage id={friend.userId} />
              <button className={styles.friendBtn}>Remove Friend</button>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noFriendsText}>You don't have any friends yet!</p>
      )}
    </div>
  );
}
