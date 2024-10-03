import React from 'react';
import styles from './ProfileBar.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setProfileData } from '../../redux/slices/profileSlice';

export default function ProfileBar({ handleOpenModal, handleOpenModalInfo }) {
    const dispatch = useDispatch();
    
    // Отримуємо дані профілю з Redux
    const profileData = useSelector((state) => state.profile);

    // Функція для зміни фону профілю
    const handleBackgroundChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Оновлюємо дані профілю через Redux
                dispatch(setProfileData({
                    backgroundProfile: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Функція для зміни зображення профілю
    const handleProfilePictureChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Оновлюємо дані профілю через Redux
                dispatch(setProfileData({
                    profilePicture: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.backgroundProfile} style={{
                backgroundImage: `url(${profileData.backgroundProfile || '/path/to/default/background.jpg'})`
            }}>
                <label className={styles.customFileBacgroundUpload}>
                    <img src="/image/main/Edit.svg" alt="Редагувати фон" />
                    <input type="file" accept="image/*" onChange={handleBackgroundChange} />
                </label>
                <div className={styles.photoContainer}>
                    <label className={styles.customFileUpload}>
                        {profileData.profilePicture ? (
                            <img src={profileData.profilePicture} alt="Профіль" />
                        ) : (
                            <img src="/path/to/default/profile.jpg" alt="Стандартний профіль" />
                        )}
                        <input type="file" accept="image/*" onChange={handleProfilePictureChange} />
                    </label>
                </div>
            </div>
            <h2 className={styles.nameProfile}>
                {profileData.firstName} {profileData.lastName}
            </h2>
            <h3 className={styles.professionProfile}>{profileData.headline}</h3>
            <h3 className={styles.cityProfile}>
                {profileData.country}, {profileData.city}
            </h3>
            <button onClick={handleOpenModal} className={styles.openModal}>
                <img src="/image/main/Edit.svg" alt="Редагувати профіль" />
            </button>   
            <button className={styles.aboutProfileBtn} onClick={handleOpenModalInfo}>More</button>
        </div>
    );
}
