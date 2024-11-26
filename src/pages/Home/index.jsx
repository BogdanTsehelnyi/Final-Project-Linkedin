import React, { useEffect } from "react";
import PageWrapper from "../../components/Wrappers/PageWrapper";
import ProfileDescBar from "../../components/ProfileDescBar";
import styles from "./Home.module.scss";
import ConnectionAside from "../../components/ConnectionAside";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../redux/slices/profileSlice";
import { fetchCarts } from "../../redux/slices/friendProfileSlice";
import NavAsideMenu from "../../components/NavAsideMenu";
import AsideRecommendation from "../../components/AsideRecommendation";
import AsideFooter from "../../components/AsideFooter";
import Post from "../../components/Post";
import { useState } from "react";
import CreatePostModal from "../../components/CreatePostModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  // ОТРИМАННЯ ДАНИХ ДЛЯ ПРАВОГО SIDEBAR
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  // ОТРИМАННЯ ДАНИХ ДЛЯ  ЛІВОГО SIDEBAR
  useEffect(() => {
    dispatch(fetchCarts());
  }, [dispatch]);

  const profileData = useSelector((state) => state.profile.profileData);

  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);

  return (
    <>
      <PageWrapper>
        <aside className={styles.leftSideBar}>
          <ProfileDescBar profileData={profileData} loading={loading} error={error} />
          <ConnectionAside />
          <NavAsideMenu />
        </aside>

        {/* Main Content of home */}
        <div className={styles.mainContentContainer}>
          <div className={styles.userDetails}>
            <img src={profileData.profilePicture} alt="imageLink" />
            <p className={styles.name}>
              {profileData.firstName} {profileData.lastName}
            </p>
            {/* <p className={styles.headline}>{profileData.lastName}</p> */}
          </div>

          {/* CREATING NEW PUBLICATION */}
          <div className={styles.postStatus}>
            <img className={styles.postImage} src={profileData.profilePicture} alt="imageLink" />
            <button
              className={styles.openPostModal}
              onClick={() => {
                openModal();
              }}
            >
              Start a Post
            </button>
          </div>
          {/* POSTS */}
          <ul className={styles.postListContainer}>
            <Post />
          </ul>
        </div>

        {/* LEFT SIDEBAR */}

        <aside>
          <AsideRecommendation profileData={profileData} />

          <AsideFooter />
        </aside>
      </PageWrapper>
      <CreatePostModal postModal={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}
