import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addFriend, removeFriend } from '../../redux/slices/friendProfileSlice'; // Імпортуємо дії
import styles from './AnotherProfileBar.module.scss'; 

export default function AnotherProfileBar() {
    const { friendId } = useParams(); // Отримуємо friendId з URL
    const dispatch = useDispatch();
    const { allProfiles, friendsData, loading, error } = useSelector((state) => state.friend); // Отримуємо всі профілі та список друзів
    
    const [pendingAction, setPendingAction] = useState(false); // Для блокування кнопок під час очікування

    // Знаходимо профіль за friendId
    const friendProfile = allProfiles.find(profile => profile.id === friendId);

    // Перевіряємо, чи цей профіль вже є другом
    const isFriend = friendsData.some(friend => friend.id === friendId);

    useEffect(() => {
        console.log("Rendering profile for friendId:", friendId);
        console.log("Friend Profile:", friendProfile);
    }, [friendId, friendProfile]);

    if (loading) return <p>Завантаження профілю...</p>;
    if (error) return <p>Помилка завантаження профілю: {error}</p>;
    if (!friendProfile) return <p>Профіль не знайдено</p>;

    // Функція для додавання в друзі
    const handleAddFriend = () => {
        setPendingAction(true);
        dispatch(addFriend(friendProfile)).finally(() => {
            setPendingAction(false);
        });
    };

    // Функція для видалення з друзів
    const handleRemoveFriend = () => {
        setPendingAction(true);
        dispatch(removeFriend(friendId)).finally(() => {
            setPendingAction(false);
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.backgroundProfile} style={{
                backgroundImage: `url(${friendProfile.backgroundProfile || '/path/to/default/background.jpg'})`
            }}>
                <div className={styles.photoContainer}>
                    <img 
                        src={friendProfile.profilePicture || '/path/to/default/profile.jpg'} 
                        alt="Профіль" 
                        className={styles.friendPhoto}
                    />
                </div>
            </div>
            <h2 className={styles.nameProfile}>
                {friendProfile.firstName} {friendProfile.lastName}
            </h2>
            <h3 className={styles.professionProfile}>{friendProfile.headline}</h3>
            <h3 className={styles.cityProfile}>
                {friendProfile.location.country}, {friendProfile.location.city}
            </h3>

            {/* Відображаємо кнопку для додавання або видалення з друзів */}
            <div className={styles.actionButtons}>
                {isFriend ? (
                    <button 
                        onClick={handleRemoveFriend} 
                        className={styles.friendActionBtn}
                        disabled={pendingAction}  // Блокуємо кнопку під час очікування
                    >
                        {pendingAction ? 'Removing...' : 'Remove'}
                    </button>
                ) : (
                    <button 
                        onClick={handleAddFriend} 
                        className={styles.friendActionBtn}
                        disabled={pendingAction}  // Блокуємо кнопку під час очікування
                    >
                        {pendingAction ? 'Adding...' : 'Establish contact'}
                    </button>
                )}
            </div>
        </div>
    );
}