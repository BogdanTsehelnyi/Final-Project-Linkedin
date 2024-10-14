import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFriend } from "../../redux/slices/friendProfileSlice";
import styles from "./AnotherProfiles.module.scss";

export default function AnotherProfiles() {
    const dispatch = useDispatch();
    
    // Отримуємо всі профілі та список друзів з Redux
    const allProfiles = useSelector((state) => state.friend.allProfiles);
    const friendsData = useSelector((state) => state.friend.friendsData);
    
    const [pendingProfiles, setPendingProfiles] = useState({});

    // Функція для додавання друга
    const handleAddFriend = (profile) => {
        const existingFriend = friendsData.find(friend => friend.id === profile.id);
        if (!existingFriend) {
            setPendingProfiles(prev => ({ ...prev, [profile.id]: true }));
            dispatch(addFriend(profile)).finally(() => {
                setPendingProfiles(prev => ({ ...prev, [profile.id]: false }));
            });
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.anotherProfileTitle}>Another profile for you</h3>
            {allProfiles.map((profile) => (
                <div className={styles.profileContainer} key={profile.id}>
                    <img className={styles.anotherProfilePhoto} src={profile.profilePicture || '/path/to/default/image.jpg'} alt="profile" />
                    <div className={styles.profileInfo}>
                        <h3 className={styles.profileName}>{profile.firstName} {profile.lastName}</h3>
                        <p className={styles.profileHeadline}>{profile.headline}</p>

                        <button
                            onClick={() => handleAddFriend(profile)}
                            className={styles.anotherProfileBtn}
                            disabled={pendingProfiles[profile.id] || friendsData.some(friend => friend.id === profile.id)}
                        >
                            {friendsData.some(friend => friend.id === profile.id) ? "Friend Added" : "Establish contact"}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

