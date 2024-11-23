import React, { useState, useEffect } from 'react';
import styles from './ProfileBar.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setProfileData } from '../../redux/slices/profileSlice';
import axios from 'axios';
import { logout } from '../../redux/slices/authSlice'; // Импортируем экшен для выхода

export default function ProfileBar({ handleOpenModal, handleOpenModalInfo }) {
    const { profileData, loading, error } = useSelector((state) => state.profile);
    const dispatch = useDispatch();

    const [profilePicture, setProfilePicture] = useState('/path/to/default/profile.jpg');
    const [backgroundImage, setBackgroundImage] = useState('/path/to/default/background.jpg');

    useEffect(() => {
        if (profileData.profilePicture) {
            setProfilePicture(profileData.profilePicture);
        }
    }, [profileData.profilePicture]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePicture(reader.result);
                dispatch(setProfileData({ ...profileData, profilePicture: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBackgroundUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBackgroundImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleLogout = async () => {
        try {
            const response = await axios.post(
                "https://final-project-link.onrender.com/logout",
                {},
                {
                    withCredentials: true,
                    maxRedirects: 0
                }
            );
            if (response.status === 200) {
                console.log('Logout response:', response);
                dispatch(logout()); // Вызываем экшен выхода
            }
        } catch (error) {
            console.error('Ошибка при выходе из системы:', error);
        }
    };

    if (loading) {
        return <p>Завантаження профілю...</p>;
    }

    if (error) {
        return <p>Помилка завантаження профілю: {error}</p>;
    }

    if (!profileData.firstName) {
        return <p>Дані профілю не знайдено</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.backgroundProfile} style={{ backgroundImage: `url(${backgroundImage})` }}>
                <label className={styles.customFileBacgroundUpload}>
                    <img src="/image/main/Edit.svg" alt="Редагувати фон" />
                    <input type="file" accept="image/*" onChange={handleBackgroundUpload} />
                </label>
                <div className={styles.photoContainer}>
                    <label className={styles.customFileUpload}>
                        <img src={profilePicture} alt="Профіль" />
                        <input type="file" accept="image/*" onChange={handleImageUpload} />
                    </label>
                </div>
            </div>
            <h2 className={styles.nameProfile}>
                {profileData.firstName} {profileData.lastName}
            </h2>
            <h3 className={styles.professionProfile}>{profileData.headline}</h3>
            <h3 className={styles.cityProfile}>
                {profileData.location.country}, {profileData.location.city}
            </h3>
            <button onClick={handleOpenModal} className={styles.openModal}>
                <img src="/image/main/Edit.svg" alt="Редагувати профіль" />
            </button>   
            <button className={styles.aboutProfileBtn} onClick={handleOpenModalInfo}>More</button>

           
            <button className={styles.logoutButton} onClick={handleLogout}>
                Выйти из аккаунта
            </button>
        </div>
    );
}
