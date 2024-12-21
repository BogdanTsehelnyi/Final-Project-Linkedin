import React, { useState } from "react";
import styles from "./Post.module.scss";
import ExpandableText from "../../components/ExpandableText";
import Dislike from "./images-Post/thumbs-down.svg";
import Like from "./images-Post/Shape (Stroke).svg";
import Send from "./images-Post/arrow-up.svg";
import Trash from "./images-Post/trash-2.svg";

export default function Post() {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const text =
    "React probably needs to be loaded into memory anyways Lorem ipsum dolor sit amet consectetur, but it’d also be fine to switch it to read the version number. The difference is that folks might be using something like yarn PnP which might not have a file system on disk.";

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const handleDeleteComment = (indexToDelete) => {
    const updatedComments = comments.filter((_, index) => index !== indexToDelete);
    setComments(updatedComments);
  };

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
          <img src={Like} alt="like" />
          <span>Like</span>
        </button>
        <button>
          <img src={Dislike} alt="Dislike" />
          <span>Dislike</span>
        </button>
        <button onClick={() => setShowCommentModal(!showCommentModal)}>
          <img src="image/publication/Comment.svg" alt="Comment" />
          <span>Comment</span>
        </button>
        <button>
          <img src="image/publication/SendMessage.svg" alt="Send" />
          <span>Send</span>
        </button>
      </div>

      {showCommentModal && (
        <div className={styles.commentModal}>
          <div className="input-comment">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment..."
            className={styles.commentInput}
          ></textarea>
          <button onClick={handleAddComment} className={styles.addCommentButton}>
            <img src={Send} alt="Send" />
          </button>
          </div>
          <div className={styles.commentList}>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div key={index} className={styles.commentItem}>
                  <p className="comment_text">{comment}</p>
                  <button
                    onClick={() => handleDeleteComment(index)}
                    className={styles.deleteCommentButton}
                  >
                    <img src={Trash} alt="Send" />
                  </button>
                </div>
              ))
            ) : (
              <p className={styles.noComments}>No comments yet</p>
            )}
          </div>
        </div>
      )}
    </li>
  );
}


