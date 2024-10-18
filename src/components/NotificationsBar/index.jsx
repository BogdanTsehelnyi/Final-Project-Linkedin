import { useSelector } from "react-redux";
import styles from "./NotificationsBar.module.scss";
import ChatMiniBar from "../ChatMiniBar";

export default function NotificationsBar () {
    const friends = useSelector((state) => state.friend.friendsData); 

    return (
        <>
            <main className={styles.notifications}>
                <section className={styles.notificationsBar}>                    
                    {friends.length > 0 ? (
                    friends.map((friend) => (
                    <div className={styles.notificationsBarContainer} key={friend.id}>
                        <div className={styles.notificationsBarItem}>
                            <img className={styles.notificationsBarPhoto} src={friend.profilePicture || '/path/to/default/image.jpg'} alt="profile" />
                            <div className={styles.notificationsBarInfo}>
                                <h3 className={styles.friendName}>
                                    {friend.firstName} {friend.lastName} підтвердив, що ви його друг.
                                </h3>
                            </div>
                        </div>
                        <img className={styles.notificationsBarItemMenu} src="image/profile/three-dots.svg" alt="dots" />
                    </div>
                ))
            ) : (
                <p className={styles.noFriendsText}>You don't have any notifications yet!</p>
            )}
                </section>
                <section></section>
                <div className={styles.fixedImg}>
                    <img src="image/main/fixedImg.png" alt="" />
                </div>
                <ChatMiniBar />
            </main>
        </>
    )
}
