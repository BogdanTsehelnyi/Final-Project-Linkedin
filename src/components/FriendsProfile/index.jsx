import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFriend } from "../../redux/slices/friendProfileSlice"; // Подключаем действие removeFriend
import styles from "./FriendsProfile.module.scss";
import { useNavigate } from "react-router-dom";

export default function FriendsProfile() {
    const friends = useSelector((state) => state.friend.friendsData); // Получаем список друзей из состояния
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Удаление друга
    const handleRemoveFriend = (id) => {
        dispatch(removeFriend(id)); // Удаляем друга по ID
    };

    // Переход к профилю друга
    const handleNavigateToProfile = (id) => {
        navigate(`/profile/${id}`); // Переходим на страницу профиля
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.friendsProfileTitle}>Your Friends</h3>
            {friends.length > 0 ? (
                friends.map((friend) => (
                    <div className={styles.friendContainer} key={friend.id}>
                        <div className={styles.friendBox}>
                            <img 
                                onClick={() => handleNavigateToProfile(friend.id)} 
                                className={styles.friendPhoto} 
                                src={friend.profilePicture || "/path/to/default/image.jpg"} 
                                alt="profile" 
                            />
                            <div className={styles.friendInfo}>
                                <h3 className={styles.friendName}>
                                    {friend.name} {friend.surname}
                                </h3>
                                <p className={styles.friendHeadline}>{friend.position}</p>
                            </div>
                        </div>
                        <div className={styles.btnBox}>
                            <button 
                                className={styles.friendBtn}
                                onClick={() => console.log("Message to", friend.name)}
                            >
                                Message
                            </button>
                            <button 
                                className={styles.friendBtn} 
                                onClick={() => handleRemoveFriend(friend.id)}
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
