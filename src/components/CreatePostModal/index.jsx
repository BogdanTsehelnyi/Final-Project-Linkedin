import React from "react";
import styles from "./CreatePostModal.module.scss";
import PostForm from "../../components/PostForm";

export default function CreatePostModal({ postModal, setModalOpen = () => {} }) {
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = "auto";
  };
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    postModal && (
      <div className={styles.modalWrapper}>
        <div onClick={handleBackgroundClick} className={styles.background}>
          <div className={styles.content}>
            <div className={styles.topModal}>
              <p className={styles.modalTitle}>Create Post</p>
              <span
                onClick={() => {
                  closeModal();
                }}
                className={styles.closeIcon}
              >
                &times;
              </span>
            </div>

            <PostForm />
          </div>
        </div>
      </div>
    )
  );
}
