import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommentsByPostId,
  fetchCommentCount,
  createComment,
  deleteComment,
} from "../../redux/slices/commentsSlice";
import { deletePost } from "../../redux/slices/postsSlice"; 
import styles from "./Post.module.scss";
import ExpandableText from "../../components/ExpandableText";
import Dislike from "./images-Post/thumbs-down.svg";
import Like from "./images-Post/Shape (Stroke).svg";
import Send from "./images-Post/arrow-up.svg";
import Trash from "./images-Post/trash-2.svg";

export default function Post({ postId, posts }) {
  const dispatch = useDispatch();
  const profileData = useSelector((state) => state.profile.profileData);

  const location = profileData?.address || "Unknown";
  const profilePicture =
    profileData?.headerPhotoUrl === "" || profileData?.headerPhotoUrl === undefined
      ? "/image/profile/photo_ava_default.png"
      : profileData?.headerPhotoUrl;

  const firstName = profileData?.name || "Unknown";
  const lastName = profileData?.surname || "Unknown";
  const position = profileData?.position || "Unknown";

  const status = profileData?.status
    ? profileData.status.charAt(0).toUpperCase() + profileData.status.slice(1)
    : "Unknown";

  // Данные из Redux
  const { comments, totalCount, loading } = useSelector((state) => state.comments);
  const { userId } = useSelector((state) => state.auth); // Получаем текущего пользователя

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [newComment, setNewComment] = useState("");

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

    // Обработчик удаления поста
    const handleDeletePost = (postId) => {
      dispatch(deletePost(postId))
        .then(() => {
          alert("Post deleted successfully");
        })
        .catch((error) => {
          console.error("Failed to delete post:", error);
          alert("Failed to delete post");
        });
    };
  

  return (
    <ul className={styles.postsList}>
      {posts.map((post) => (
        <li key={post.postId} className={styles.postWrapper}>
          <div className={styles.descriptionProfile}>
            <div className={styles.profilwrapper} >
            <a className={styles.postAvatarContainer} href="#">
              <img src={profilePicture} alt="avatar" />
            </a>
            <div className={styles.profileData}>
              <h3 className={styles.nameProfile}>{`${firstName} ${lastName}`}</h3>
              <p className={styles.specialization}>{position}</p>
            </div>
            </div>

            <button onClick={() => handleDeletePost(post.postId)} className={styles.deletePost}>
            <img src={Trash} alt="Delete" />
            </button>
          </div>
          <div className={styles.postTextContainer}>
            <h2 className={styles.title}>{post.title}</h2>
            <ExpandableText text={post.content} maxLength={100} />
          </div>
          {post.photoUrl !== "" && (
            <div className={styles.postImgContainer}>
              <img src={post.photoUrl} alt="postImage" />
            </div>
          )}

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
                          <span className={styles.commentAuthor}>
                            Author ID: {comment.authorId}
                          </span>
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
      ))}
    </ul>
  );
}
