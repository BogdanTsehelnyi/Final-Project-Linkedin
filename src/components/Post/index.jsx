import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommentsByPostId,
  fetchCommentCount,
  createComment,
  deleteComment,
} from "../../redux/slices/commentsSlice";
import styles from "./Post.module.scss";
import ExpandableText from "../../components/ExpandableText";
import Dislike from "./images-Post/thumbs-down.svg";
import Like from "./images-Post/Shape (Stroke).svg";
import Send from "./images-Post/arrow-up.svg";
import Trash from "./images-Post/trash-2.svg";

export default function Post({ postId }) {
  const dispatch = useDispatch();

  // Данные из Redux
  const { comments, totalCount, loading } = useSelector((state) => state.comments);
  const { userId } = useSelector((state) => state.auth); // Получаем текущего пользователя

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [newComment, setNewComment] = useState("");

  const text =
    "React probably needs to be loaded into memory anyways Lorem ipsum dolor sit amet consectetur, but it’d also be fine to switch it to read the version number. The difference is that folks might be using something like yarn PnP which might not have a file system on disk.";

  // Загружаем комментарии и их количество при загрузке компонента
  useEffect(() => {
    if (postId) {
      dispatch(fetchCommentsByPostId({ postId }));
      dispatch(fetchCommentCount({ postId }));
    }
  }, [dispatch, postId]);

  // Обработчик добавления комментария
  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(createComment({ postId, authorId: userId, content: newComment }));
      setNewComment("");
    }
  };

  // Обработчик удаления комментария
  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment({ commentId }));
  };

  return (
    <li className={styles.postWrapper}>
      <div className={styles.descriptionProfile}>
        <a className={styles.postAvatarContainer} href="#">
          <img src="./image/temporaryImgs/tempAvatar.png" alt="avatar" />
        </a>
        <div className={styles.profileData}>
          <h3 className={styles.nameProfile}>Your Band</h3>
          <p className={styles.followers}>26,548 followers</p>
          <p className={styles.specialization}>promoted</p>
        </div>
      </div>
      <div className={styles.postTextContainer}>
        <h2 className={styles.title}>Title Lorem ipsum dolor sit amet, consectetur adipisicing</h2>
        <ExpandableText text={text} maxLength={100} />
      </div>

      <div className={styles.postImgContainer}>
        <img src="./image/temporaryImgs/contentImg.png" alt="postImage" />
      </div>
      <div className={styles.reactionContainer}>
        <a className={styles.likesContainer}>
          <img src="image/publication/Heart.svg" alt="heart" />
          <img src="image/publication/OK.svg" alt="heart" />
          <span>1025</span>
        </a>
        <a className={styles.comments}>{totalCount} comments</a>
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
          <div className={styles.inputComment}>
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
            {loading ? (
              <p>Loading comments...</p>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.commentId} className={styles.commentItem}>
                  <div className={styles.commentHeader}>
                    <div className={styles.iconWrapper}>
                      <img
                        src="./image/temporaryImgs/tempAvatar.png"
                        alt="author avatar"
                        className={styles.commentAvatar}
                      />
                      <span className={styles.commentAuthor}>Author ID: {comment.authorId}</span>
                    </div>
                    <p className={styles.commentText}>{comment.content}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteComment(comment.commentId)}
                    className={styles.deleteCommentButton}
                  >
                    <img src={Trash} alt="Delete" />
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
