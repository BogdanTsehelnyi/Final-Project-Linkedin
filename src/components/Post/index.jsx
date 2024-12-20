import React from "react";
import styles from "./Post.module.scss";
import ExpandableText from "../../components/ExpandableText";

export default function Post() {
  const text =
    "React probably needs to be loaded into memory anyways Lorem ipsum dolor sit amet consectetur, but it’d also be fine to switch it to read the version number. The difference is that folks might be using something like yarn PnP which might not have a file system on disk.";

  return (
    <li className={styles.postWrapper}>
      <div className={styles.descriptionProfile}>
        <a className={styles.postAvatarContainer} href="#">
          <img src="/image/temporaryImgs/tempAvatar.png" alt="avatar" />
        </a>
        <div className={styles.profileData}>
          <h3 className={styles.nameProfile}>Your Band</h3>
          <p className={styles.followers}>26.548 followers</p>
          <p className={styles.specialization}>promoted</p>
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
        <a className={styles.comments}>753 comments</a>
      </div>
      <div className={styles.line}></div>
      <div className={styles.reactionBtnsContainer}>
        <button>
          <img src="image/publication/OKtwo.svg" alt="like" />
          <span>Like</span>
        </button>
        <button>
          <img src="image/publication/Comment.svg" alt="Comment" />
          <span>Comment</span>
        </button>
        <button>
          <img src="image/publication/SendMessage.svg" alt="Send" />
          <span>Send</span>
        </button>
      </div>
    </li>
  );
}
