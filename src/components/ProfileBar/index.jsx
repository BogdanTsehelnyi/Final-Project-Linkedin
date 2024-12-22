import React, { useState, useEffect } from "react";
import styles from "./ProfileBar.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setProfileData } from "../../redux/slices/profileSlice";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { logoutProfile } from "../../redux/slices/profileSlice";
import { resetProfiles } from "../../redux/slices/otherProfilesSlice";
import { updateProfile } from "../../redux/slices/profileSlice";
import { uploadFile } from "../../utils/uploadFile";

export default function ProfileBar({ handleOpenModal, handleOpenModalInfo }) {
  const folderName = "userAvatar";

  const { profileData, profileId, loading, error } = useSelector((state) => state.profile);
  const userId = useSelector((state) => state.auth.userId);

  console.log("Профіль в ProfileBar", profileData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [profilePicture, setProfilePicture] = useState("/image/profile/photo_ava_default.png");
  const [backgroundImage, setBackgroundImage] = useState(
    "/image/profile/profileBackgroundDefault.svg"
  );

  const handleLogout = async () => {
    dispatch(logout());
    dispatch(logoutProfile());
    dispatch(resetProfiles());
    navigate("/login");
  };

  // useEffect(() => {
  //   if (profileData.profilePicture) {
  //     setProfilePicture(profileData.profilePicture);
  //   }
  // }, [profileData.profilePicture]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Завантажуємо файл на сервер за допомогою функції uploadFile
        const uploadedFileUrl = await uploadFile(file, folderName);

        // Створюємо об'єкт, який очікує сервер
        const updatedProfileData = {
          userId: profileData.userId,
          name: profileData.name,
          surname: profileData.surname,
          birthdate: profileData.birthdate,
          status: profileData.status,
          headerPhotoUrl: uploadedFileUrl, // Оновлений URL для зображення
          position: profileData.position,
          address: profileData.address,
        };

        console.log("Оновлений профіль для відправки:", updatedProfileData);

        // Відправляємо оновлений профіль на сервер
        dispatch(updateProfile({ newProfileData: updatedProfileData, profileId }));

        // Оновлюємо локальний стан з новим профілем
        // setProfilePicture(uploadedFileUrl); // Для відображення нового зображення на клієнті
        dispatch(setProfileData(updatedProfileData)); // Оновлюємо профіль у Redux
      } catch (error) {
        console.error("Помилка при завантаженні зображення:", error);
      }
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

  const location = profileData?.address || "Unknown";
  const profilePicture =
    profileData?.headerPhotoUrl === "" || profileData?.headerPhotoUrl === undefined
      ? "/image/profile/photo_ava_default.png"
      : profileData?.headerPhotoUrl;

  const firstName = profileData?.name || "Unknown";
  const lastName = profileData?.surname || "Unknown";
  const position = profileData?.position || "Unknown";
  // const backgroundUrl =
  //   profileData?.backgroundImageUrl || "./image/profile/profileBackgroundDefault.svg";

  return (
    <div className={styles.container}>
      <div
        className={styles.backgroundProfile}
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        {/* <label className={styles.customFileBacgroundUpload}> 
        <img src="/image/main/Edit.svg" alt="Редагувати фон" /> 
        <input type="file" accept="image/*" onChange={handleBackgroundUpload} /> 
      </label> */}
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
      <h3 className={styles.professionProfile}>{position}</h3>
      <h3 className={styles.cityProfile}>{location}</h3>
      <button onClick={handleOpenModal} className={styles.openModal}>
        <img src="/image/main/Edit.svg" alt="Редагувати профіль" />
      </button>
      <button className={styles.aboutProfileBtn} onClick={handleOpenModalInfo}>
        More
      </button>

      <button className={styles.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
