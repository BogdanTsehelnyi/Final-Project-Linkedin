import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProfileById, clearProfile } from '../../redux/slices/profileSlice'; // Експортуємо clearProfile
import styles from './AnotherProfileBar.module.scss';

export default function AnotherProfileBar() {
  const { profileId } = useParams(); // Отримуємо ID профілю з URL
  const dispatch = useDispatch();
  const { profileData: profile, loading, error } = useSelector((state) => state.profile);

  // Завантаження даних профілю
  useEffect(() => {
    if (profileId) {
      dispatch(fetchProfileById(profileId)); // Викликаємо Redux-дію для отримання даних
    }

    return () => {
      dispatch(clearProfile()); // Очищення даних при розмонтуванні компонента
    };
  }, [dispatch, profileId]);

  if (loading) return <p>Завантаження профілю...</p>;
  if (error) return <p>Помилка завантаження профілю: {error}</p>;
  if (!profile || Object.keys(profile).length === 0) return <p>Профіль не знайдено</p>;

  // Розділяємо адресу на місто і країну
  const [city, country] = profile.address ? profile.address.split(', ') : ["", ""];

  return (
    <div className={styles.container}>
      <div className={styles.backgroundProfile} style={{
        backgroundImage: `url(${profile.headerPhotoUrl || '/path/to/default/background.jpg'})`
      }}>
        <div className={styles.photoContainer}>
          <img 
            src={profile.headerPhotoUrl || '/path/to/default/profile.jpg'} 
            alt="Профіль" 
            className={styles.friendPhoto}
          />
        </div>
      </div>
      <h2 className={styles.nameProfile}>
        {profile.name} {profile.surname}
      </h2>
      <h3 className={styles.professionProfile}>
        {profile.position || 'Посада не вказана'}
      </h3>
      <h3 className={styles.cityProfile}>
        {country || 'Країна не вказана'}, {city || 'Місто не вказане'}
      </h3>
      <p className={styles.statusProfile}>
        {profile.status || 'Статус не вказаний'}
      </p>
      <p className={styles.birthdateProfile}>
        Дата народження: {profile.birthdate ? new Date(profile.birthdate).toLocaleDateString() : 'Не вказано'}
      </p>
      <p className={styles.createdAtProfile}>
        Профіль створено: {profile.createAt ? new Date(profile.createAt).toLocaleDateString() : 'Невідомо'}
      </p>
    </div>
  );
}
