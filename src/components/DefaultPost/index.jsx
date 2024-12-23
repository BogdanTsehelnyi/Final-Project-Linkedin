import React from "react";
import styles from "./DefaultPost.module.scss";
import { useSelector } from "react-redux";
import ExpandableText from "../../components/ExpandableText";

export default function DefaultPost() {
  const profileData = useSelector((state) => state.profile.profileData);
  //   const location = profileData?.address || "Unknown";
  const profilePicture =
    profileData?.headerPhotoUrl === "" || profileData?.headerPhotoUrl === undefined
      ? "/image/profile/photo_ava_default.png"
      : profileData?.headerPhotoUrl;

  const firstName = profileData?.name || "Unknown";
  const lastName = profileData?.surname || "Unknown";
  const position = profileData?.position || "Unknown";

  const text =
    "React probably needs to be loaded into memory anyways Lorem ipsum dolor sit amet consectetur, but it’d also be fine to switch it to read the version number";

  return (
    <li className={styles.postWrapper}>
      <div className={styles.descriptionProfile}>
        <a className={styles.postAvatarContainer} href="#">
          <img src={profilePicture} alt="avatar" />
        </a>
        <div className={styles.profileData}>
          <h3 className={styles.nameProfile}>{`${firstName} ${lastName}`}</h3>

          <p className={styles.specialization}>{position}</p>
        </div>
      </div>
      <div className={styles.postTextContainer}>
        <h2 className={styles.title}>Title Lorem ipsum dolor sit amet, consectetur adipisicing</h2>
        <ExpandableText text={text} maxLength={100} />
      </div>

      <div className={styles.postImgContainer}>
        <img src="/image/temporaryImgs/contentImg.png" alt="postImage" />
      </div>
      <div className={styles.reactionContainer}>
        <a className={styles.likesContainer}>
          <img src="image/publication/Heart.svg" alt="heart" />
          <img src="image/publication/OK.svg" alt="heart" />
          <span>1025</span>
        </a>
        <a className={styles.comments}> 15 comments</a>
      </div>
      <div className={styles.line}></div>
      <div className={styles.reactionBtnsContainer}>
        <button>
          <img src="image/publication/like2.svg" alt="like" />
          <span>Like</span>
        </button>
        <button>
          <img src="image/publication/dislike.svg" alt="Dislike" />
          <span>Dislike</span>
        </button>
        <button onClick={() => setShowCommentModal(!showCommentModal)}>
          <img src="image/publication/Comment.svg" alt="Comment" />
          <span>Comment</span>
        </button>
        {/* <button>
          <img src="image/publication/SendMessage.svg" alt="Send" />
          <span>Send</span>
        </button> */}
      </div>
    </li>
  );
}
