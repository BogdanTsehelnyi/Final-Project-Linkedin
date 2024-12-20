import React, { useEffect } from "react";
import ChangeProfileModal from "../../components/ChangeProfileModal";
import axios from "axios";
import AnotherProfiles from "../../components/AnotherProfiles";
import styles from "./Profile.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  handleOpenProfileModal,
  handleCloseProfileModal,
  handleOpenInfoModal,
  handleCloseInfoModal,
} from "../../redux/slices/modal";
import FullProfileInfoModal from "../../components/FullProfileInfoModal";
import ProfileBar from "../../components/ProfileBar";
import ProfileFooter from "../../components/ProfileFooter";

import Preloader from "../../components/common/Preloader";

export default function Profile() {
  const dispatch = useDispatch();

  const openProfileModal = useSelector((state) => state.changeProfileModal.openProfileModal);
  const openInfoModal = useSelector((state) => state.changeProfileModal.openInfoModal);
  const profileData = useSelector((state) => state.profile.profileData);

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
      <FullProfileInfoModal open={openInfoModal} handleClose={closeInfoModalHandler} />
      <ProfileFooter />
    </div>
  );
}
