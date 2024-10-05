import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFriend } from "../../redux/slices/friendProfileSlice"; // Імпорт дій з Redux
import styles from "./FriendsProfile.module.scss";

export default function FriendsProfile() {
    const friends = useSelector((state) => state.friend); // Отримуємо список друзів з Redux
    const dispatch = useDispatch();

    // Функція для видалення друга
    const handleRemoveFriend = (id) => {
        dispatch(removeFriend(id)); // Видаляємо друга за його ID
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.friendsProfileTitle}>Your Friends</h3>
            {friends.length > 0 ? (
                friends.map((friend) => (
                    <div className={styles.friendContainer} key={friend.id}>
                        <div className={styles.friendBox}>
                        <img className={styles.friendPhoto} src={friend.profilePicture || '/path/to/default/image.jpg'} alt="profile" />
                        <div className={styles.friendInfo}>
                            <h3 className={styles.friendName}>{friend.firstName} {friend.lastName}</h3>
                            <p className={styles.friendHeadline}>{friend.headline}</p>
                        </div>
                        </div>
                        <div className={styles.btnBox}>
                        <button className={styles.friendBtn}>
                                Message
                        </button>
                        <button onClick={() => handleRemoveFriend(friend.id)} className={styles.friendBtn}>
                                Remove Friend
                        </button>
                        </div>
                    </div>
                ))
            ) : (
                <p className={styles.noFriendsText}>You don't have any friends yet!</p>
            )}
        </div>
    );
}