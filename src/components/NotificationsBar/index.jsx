import { useDispatch, useSelector } from "react-redux";
import styles from "./NotificationsBar.module.scss";
import ChatMiniBar from "../ChatMiniBar";
import PageWrapper from "../Wrappers/PageWrapper";
import AsideFooter from "../AsideFooter";
import ProfileDescBar from "../../components/ProfileDescBar";

export default function NotificationsBar() {
  const friends = useSelector((state) => state.friends.friendsData || []); // Безпечний доступ до friendsData
  const dispatch = useDispatch();

  return (
    <>
      <PageWrapper>
        <aside>
          <ProfileDescBar />
        </aside>

        <section className={styles.notificationsBar}>
          {friends.length > 0 ? (
            friends.map((friend) => (
              <div className={styles.notificationsBarContainer} key={friend.id}>
                <div className={styles.notificationsBarItem}>
                  <div className={styles.notificationsPhotoContainer}>
                    <img
                      className={styles.notificationsBarPhoto}
                      src={friend.profilePicture || "/path/to/default/image.jpg"}
                      alt="profile"
                    />
                  </div>

                  <div className={styles.notificationsBarInfo}>
                    <h3 className={styles.friendName}>
                      {friend.firstName} {friend.lastName} підтвердив, що ви його друг.
                    </h3>
                  </div>
                </div>
                <img
                  className={styles.notificationsBarItemMenu}
                  src="image/profile/three-dots.svg"
                  alt="dots"
                  onClick={() => dispatch(removeFriend(friend.id))}
                />
              </div>
            ))
          ) : (
            <p className={styles.noFriendsText}>You don't have any notifications yet!</p>
          )}
        </section>
        <aside>
          <AsideFooter />
        </aside>
        <ChatMiniBar />
      </PageWrapper>
    </>
  );
}
