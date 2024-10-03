import React, { useEffect } from 'react';
import ChangeProfileModal from "../../components/ChangeProfileModal";
import ProfileBar from "../../components/ProfileBar";
import axios from 'axios';
import AnotherProfiles from '../../components/AnotherProfiles';
import styles from './Profile.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setProfileData } from '../../redux/slices/profileSlice';
import { 
  handleOpenProfileModal, 
  handleCloseProfileModal,
  handleOpenInfoModal, 
  handleCloseInfoModal 
} from '../../redux/slices/modal';
import FullProfileInfoModal from '../../components/FullProfileInfoModal';

export default function Profile() {
  const dispatch = useDispatch();
  
  const profileData = useSelector((state) => state.profile);
  
  // Стани для двох різних модалок
  const openProfileModal = useSelector((state) => state.changeProfileModal.openProfileModal);
  const openInfoModal = useSelector((state) => state.changeProfileModal.openInfoModal);

  useEffect(() => {
    async function fetchProfileData() {
        try {
            const response = await axios.get('/API/profile.json');
            
            // Беремо перший досвід роботи (якщо є)
            const experience = response.data.experience?.[0] || {};
            const education = response.data.education?.[0] || {};
            const language = response.data.languages?.[0] || {};
            const certification = response.data.certifications?.[0] || {};

            dispatch(setProfileData({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                email: response.data.email,
                headline: response.data.headline,
                country: response.data.location?.country || '',
                city: response.data.location?.city || '',
                industry: response.data.industry || '',
                // Дані про досвід роботи
                experienceTitle: experience.title || '',
                experienceCompany: experience.company || '',
                experienceDescription: experience.description || '',
                // Дані про освіту
                educationDegree: education.degree || '',
                educationFieldOfStudy: education.fieldOfStudy || '',
                // Навички
                skills: response.data.skills || [],
                // Мови
                languages: language.language || '',
                proficiency: language.proficiency || '',
                // Сертифікації
                certifications: certification.name || '',
                profilePicture: response.data.profilePicture,
                backgroundProfile: response.data.backgroundProfile || '/path/to/default/background.jpg'
            }));
        } catch (error) {
            console.error('Помилка завантаження даних:', error);
        }
    }

    fetchProfileData();
  }, [dispatch]);

  const openProfileModalHandler = () => dispatch(handleOpenProfileModal());
  const closeProfileModalHandler = () => dispatch(handleCloseProfileModal());

  const openInfoModalHandler = () => dispatch(handleOpenInfoModal());
  const closeInfoModalHandler = () => dispatch(handleCloseInfoModal());

  return (
    <div className={styles.container}>
      <div className={styles.profileBox}>
        <ProfileBar 
          handleOpenModal={openProfileModalHandler}
          handleOpenModalInfo={openInfoModalHandler}
        />
        <AnotherProfiles />
      </div>
      {/* Тепер стан відкриття модалки передається через Redux */}
      <ChangeProfileModal />
      <FullProfileInfoModal
        open={openInfoModal}
        handleClose={closeInfoModalHandler}
      />
    </div>
  );
}
