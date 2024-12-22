import React, { useEffect } from "react";
import PageWrapper from "../../components/Wrappers/PageWrapper";
import ProfileDescBar from "../../components/ProfileDescBar";
import styles from "./Home.module.scss";
import ConnectionAside from "../../components/ConnectionAside";
import { useSelector } from "react-redux";

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

  // ОТРИМАННЯ ДАНИХ ДЛЯ  ЛІВОГО SIDEBAR

  const profileData = useSelector((state) => state.profile.profileData);

  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);

  const location = profileData?.address || "Unknown";
  const profilePicture =
    profileData?.headerPhotoUrl === "" || profileData?.headerPhotoUrl === undefined
      ? "/image/profile/photo_ava_default.png"
      : profileData?.headerPhotoUrl;

  const firstName = profileData?.name || "Unknown";
  const lastName = profileData?.surname || "Unknown";
  const position = profileData?.position || "Unknown";

  return (
    <>
      <PageWrapper>
        <aside className={styles.leftSideBar}>
          <ProfileDescBar />
          <ConnectionAside />
          <NavAsideMenu />
        </aside>

        {/* Main Content of home */}
        <div className={styles.mainContentContainer}>
          <div className={styles.userDetails}>
            <img src={profilePicture} alt="imageLink" />
            <p className={styles.name}>
              {firstName} {lastName}
            </p>
          </div>

          {/* CREATING NEW PUBLICATION */}
          <div className={styles.postStatus}>
            <img
              className={styles.postImage}
              src="/image/publication/new-post.png"
              alt="imageLink"
            />
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
          <AsideRecommendation />

          <AsideFooter />
        </aside>
      </PageWrapper>
      <CreatePostModal postModal={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
}
