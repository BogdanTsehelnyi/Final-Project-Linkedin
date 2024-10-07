import axios from "axios";
import styles from "./AnotherProfiles.module.scss";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFriend } from "../../redux/slices/friendProfileSlice"; // Імпорт дій з Redux

export default function AnotherProfiles() {
    const dispatch = useDispatch();

    // Стан для завантажених профілів
    const [anotherProfileData, setAnotherProfileData] = useState([]);
    
    // Отримуємо список друзів з Redux
    const friendsData = useSelector((state) => state.friend.friendsData);

    // Завантаження даних профілів при рендері
    useEffect(() => {
        async function fetchAnotherProfileData() {
            try {
                const response = await axios.get('/API/anotherProfile.json');
                setAnotherProfileData(response.data); 
            } catch (error) {
                console.error('Помилка завантаження даних:', error);
            }
        }

        fetchAnotherProfileData(); 
    }, []);

    // Функція для додавання друга
    const handleAddFriend = (profile) => {
        const existingFriend = friendsData.find(friend => friend.id === profile.id);
        
        if (!existingFriend) {
            // Додаємо профіль у список друзів через Redux
            dispatch(addFriend(profile));
        } else {
            alert("Цей користувач вже у списку ваших друзів!");
        }
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.anotherProfileTitle}>Another profile for you</h3>
            {anotherProfileData.map((profile, index) => (
                <div className={styles.profileContainer} key={index}>
                    <img className={styles.anotherProfilePhoto} src={profile.profilePicture || '/path/to/default/image.jpg'} alt="profile" />
                    <div className={styles.profileInfo}>
                        <h3 className={styles.profileName}>{profile.firstName} {profile.lastName}</h3>
                        <p className={styles.profileHeadline}>{profile.headline}</p>
                        {/* Передаємо профіль при кліці */}
                        <button onClick={() => handleAddFriend(profile)} className={styles.anotherProfileBtn}>
                            Establish contact
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
