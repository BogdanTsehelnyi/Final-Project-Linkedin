
import React, { useState, useEffect } from "react";
import styles from "./ProfileBar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile, setProfileData } from "../../redux/slices/profileSlice";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { fetchProfileByUserId } from "../../redux/slices/profileSlice";

export default function ProfileBar({ handleOpenModal, handleOpenModalInfo }) {
  const { profileData, profileId, loading, error } = useSelector((state) => state.profile);
  const userId = useSelector((state) => state.auth.userId);
  console.log(profileData);

  console.log("userId in ProfileBar", userId);

  console.log("Профіль айдішка в ProfileBar", profileId);
  console.log("Профіль в ProfileBar", profileData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      dispatch(fetchProfileByUserId(userId));
    }
  }, [dispatch, userId]);


  
  useEffect(() => {
    if (profileId) {
      dispatch(fetchProfile(profileId));
    }
  }, [dispatch, profileId]);

  const [profilePicture, setProfilePicture] = useState("./image/profile/photo_ava_default.png");
  const [backgroundImage, setBackgroundImage] = useState(
    "./image/profile/profileBackgroundDefault.svg"
  );

  const handleLogout = async () => {
    dispatch(logout()); // Використовуємо dispatch для виклику logout
    navigate("/login");
  };

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

  // if (loading) {
  //   return <p>Завантаження профілю...</p>;
  // }

  // if (error) {
  //   return <p>Помилка завантаження профілю: {error}</p>;
  // }

  // if (!profileData.firstName) {
  //   return <p>Дані профілю не знайдено</p>;
  // }
  const country = profileData?.location?.country || "Unknown country";
  const city = profileData?.location?.city || "Unknown city";
  // const profilePicture = profileData?.profilePicture || "./image/profile/profileDefault.svg";
  const firstName = profileData?.firstName || "Unknown";
  const lastName = profileData?.lastName || "Unknown";
  // const backgroundUrl =
  //   profileData?.backgroundImageUrl || "./image/profile/profileBackgroundDefault.svg";

  return (
    <div className={styles.container}>
      <div
        className={styles.backgroundProfile}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >

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

        {firstName} {lastName}
      </h2>
      <h3 className={styles.professionProfile}>developer</h3>
      <h3 className={styles.cityProfile}>
        {country}, {city}
      </h3>
      <button onClick={handleOpenModal} className={styles.openModal}>
        <img src="/image/main/Edit.svg" alt="Редагувати профіль" />
      </button>
      <button className={styles.aboutProfileBtn} onClick={handleOpenModalInfo}>
        More
      </button>

      <button className={styles.logoutButton} onClick={handleLogout}>
        Выйти из аккаунта

      </button>
    </div>
  );
}
