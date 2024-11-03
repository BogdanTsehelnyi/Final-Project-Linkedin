import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFriend, removeFriend } from "../../redux/slices/friendProfileSlice";
import { useNavigate } from 'react-router-dom';
import styles from "./AnotherProfiles.module.scss";

export default function AnotherProfiles() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const allProfiles = useSelector((state) => state.friend.allProfiles);
    const friendsData = useSelector((state) => state.friend.friendsData);
    
    const [pendingProfiles, setPendingProfiles] = useState({});

    const handleAddFriend = (profile) => {
        const existingFriend = friendsData.find(friend => friend.id === profile.id);
        if (!existingFriend) {
            setPendingProfiles(prev => ({ ...prev, [profile.id]: true }));
            dispatch(addFriend(profile)).finally(() => {
                setPendingProfiles(prev => ({ ...prev, [profile.id]: false }));
            });
        }
    };

    const handleRemoveFriend = (profileId) => {
        setPendingProfiles(prev => ({ ...prev, [profileId]: true }));
        dispatch(removeFriend(profileId)).finally(() => {
            setPendingProfiles(prev => ({ ...prev, [profileId]: false }));
        });
    };

    const handleNavigateToProfile = (id) => {
        navigate(`/friend/${id}`);  // Навігація на сторінку профілю за ID
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.anotherProfileTitle}>Another profile for you</h3>
            {allProfiles.map((profile) => (
                <div className={styles.profileContainer} key={profile.id}>
                    {/* Навігація при натисканні на зображення профілю */}
                    <div className={styles.anotherProfilePhotoContainer}>
                    <img 
                        className={styles.anotherProfilePhoto} 
                        src={profile.profilePicture || '/path/to/default/image.jpg'} 
                        alt="profile" 
                        onClick={() => handleNavigateToProfile(profile.id)} // Викликаємо навігацію
                    />
                    </div>
                    <div className={styles.profileInfo}>
                        <h3 className={styles.profileName}>{profile.firstName} {profile.lastName}</h3>
                        <p className={styles.profileHeadline}>{profile.headline}</p>

                        {/* Перевіряємо, чи вже доданий профіль у список друзів */}
                        {friendsData.some(friend => friend.id === profile.id) ? (
                            <button
                                onClick={() => handleRemoveFriend(profile.id)}  // Видаляємо друга
                                className={styles.anotherProfileBtn}
                                disabled={pendingProfiles[profile.id]}
                            >
                                {pendingProfiles[profile.id] ? "Removing..." : "Cancel Contact"}
                            </button>
                        ) : (
                            <button
                                onClick={() => handleAddFriend(profile)}  // Додаємо друга
                                className={styles.anotherProfileBtn}
                                disabled={pendingProfiles[profile.id]}
                            >
                                {pendingProfiles[profile.id] ? "Adding..." : "Establish contact"}
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
