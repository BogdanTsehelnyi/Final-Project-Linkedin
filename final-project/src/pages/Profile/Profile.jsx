import React, { useEffect } from 'react';
import ChangeProfileModal from "../../components/ChangeProfileModal";
import ProfileBar from "../../components/ProfileBar";
import axios from 'axios';
import AnotherProfiles from '../../components/AnotherProfiles';
import styles from './Profile.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { 
  handleOpenProfileModal, 
  handleCloseProfileModal,
  handleOpenInfoModal, 
  handleCloseInfoModal 
} from '../../redux/slices/modal';
import FullProfileInfoModal from '../../components/FullProfileInfoModal';

export default function Profile() {
  const dispatch = useDispatch();
  
  const openProfileModal = useSelector((state) => state.changeProfileModal.openProfileModal);
  const openInfoModal = useSelector((state) => state.changeProfileModal.openInfoModal);
  const profileData = useSelector((state) => state.profile.profileData);
  

  useEffect(() => {
    const fetchProfileData = async () => {
        try {
            const response = await axios.get('/API/profile.json');
            console.log('Fetched profile data:', response.data); // Логую дані
        } catch (error) {
            console.error('Помилка завантаження даних:', error);
        }
    };

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
      <ChangeProfileModal />
      <FullProfileInfoModal
        open={openInfoModal}
        handleClose={closeInfoModalHandler}
      />
    </div>
  );
}
