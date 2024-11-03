import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFriend } from "../../redux/slices/friendProfileSlice";
import styles from "./FriendsProfile.module.scss";
import { useNavigate } from "react-router-dom";

export default function FriendsProfile() {
    // Використовуємо friendsData, оскільки він містить лише доданих друзів
    const friends = useSelector((state) => state.friend.friendsData); 
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRemoveFriend = (id) => {
        dispatch(removeFriend(id));
    };

    const handleNavigateToProfile = (id) => {
        // Перенаправляємо на сторінку профіля з ID друга
        navigate(`/friend/${id}`);
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.friendsProfileTitle}>Your Friends</h3>
            {friends.length > 0 ? (
                friends.map((friend) => (
                    <div className={styles.friendContainer} key={friend.id}>
                        <div className={styles.friendBox}>
                            <img 
                                onClick={() => handleNavigateToProfile(friend.id)} // Викликаємо функцію для навігації з ID
                                className={styles.friendPhoto} 
                                src={friend.profilePicture || '/path/to/default/image.jpg'} 
                                alt="profile" 
                            />
                            <div className={styles.friendInfo}>
                                <h3 className={styles.friendName}>
                                    {friend.firstName} {friend.lastName}
                                </h3>
                                <p className={styles.friendHeadline}>{friend.headline}</p>
                            </div>
                        </div>
                        <div className={styles.btnBox}>
                            <button className={styles.friendBtn}>Message</button>
                            <button 
                                onClick={() => handleRemoveFriend(friend.id)} 
                                className={styles.friendBtn}
                            >
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
