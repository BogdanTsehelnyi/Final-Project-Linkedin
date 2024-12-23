import React from "react";
import styles from "./NetItems.module.scss";
import { unsubscribeFromUser } from "../../redux/slices/subscriptionSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function NetItems({ title, subscriptionData = [], quantitySubscription }) {
  const dispatch = useDispatch(); // Додано dispatch
  const userId = useSelector((state) => state.auth.userId);

  const handleUnFollowClick = async (followerId, followingId) => {
    try {
      // Виконуємо відписку від користувача
      const result = await dispatch(unsubscribeFromUser({ followerId, followingId }));
      console.log("Результат виконання unsubscribeFromUser:", result);
    } catch (error) {
      console.error("Помилка під час виконання unsubscribeFromUser:", error);
    }
  };

  return (
    <div className={styles.wrapperComponent}>
      <h3 className={styles.friendsProfileTitle}>{title}</h3>
      {quantitySubscription > 0 ? (
        subscriptionData.map((item) => (
          <div className={styles.friendContainer} key={item.userId}>
            <div className={styles.friendBox}>
              <a className={styles.imageContainer} href="">
                <img
                  onClick={() => handleNavigateToProfile(item.userId)}
                  src={
                    item.headerPhotoUrl === "" || item.headerPhotoUrl === undefined
                      ? "/image/profile/photo_ava_default.png"
                      : item.headerPhotoUrl
                  }
                  alt="profile"
                />
              </a>

              <div className={styles.friendInfo}>
                <h3 className={styles.friendName}>
                  {item.name} {item.surname}
                </h3>
              </div>
            </div>
            <div className={styles.btnBox}>
              <button
                className={styles.friendBtn}
                onClick={() => console.log("Message to", item.name)}
              >
                Message
              </button>
              <button
                className={styles.friendBtn}
                onClick={() => handleUnFollowClick(userId, item.userId)} // Викликаємо handleUnFollowClick
              >
                Remove Friend
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className={styles.noFriendsText}>You don't have any {title} yet!</p>
      )}
    </div>
  );
}
