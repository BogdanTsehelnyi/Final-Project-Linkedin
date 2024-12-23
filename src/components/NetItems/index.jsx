import React from "react";
import styles from "./NetItems.module.scss";

export default function NetItems({ title, subscriptionData = [], quantitySubscription }) {
  // Переход до профілю друга
  const handleNavigateToProfile = (userId) => {
    navigate(`/profile/${userId}`); // Переходимо на сторінку профілю
  };
  return (
    <>
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
                <button className={styles.friendBtn}>Remove Friend</button>
              </div>
            </div>
          ))
        ) : (
          <p className={styles.noFriendsText}>You don't have any {title} yet!</p>
        )}
      </div>
    </>
  );
}
