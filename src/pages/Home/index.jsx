import React, { useEffect } from "react";
import PageWrapper from "../../components/Wrappers/PageWrapper";
import ProfileDescBar from "../../components/ProfileDescBar";
import styles from "./Home.module.scss";
import AsideFooter from "../../components/AsideFooter";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile } from "../../redux/slices/profileSlice";

export default function Home() {
  // ОТРИМАННЯ ДАНИХ ДЛЯ ПРАВОГО SIDEBAR


  const profileData = useSelector((state) => state.profile.profileData);

  // const recommendationFriendData = useSelector((state) => state.friend.friendsData);

  const loading = useSelector((state) => state.profile.loading);
  const error = useSelector((state) => state.profile.error);

  return (
    <PageWrapper>
      <aside className={styles.leftSideBar}>
        <ProfileDescBar />

        <div className={styles.connectionWrapper}>
          <a>
            <div className={styles.amountConnections}>
              <p>Connections</p>
              <p>10</p>
            </div>

            <p className={styles.textConnections}>Grow your network</p>
          </a>
        </div>
        <nav className={styles.profileNavWrapper}>
          <ul className={styles.linkItems}>
            <li>
              <a className={styles.savedLink} href="#">
                <img src="./image/profile/savedIcon.svg" alt="saved icon" />
                <span> Saved items</span>
              </a>
            </li>
            <li>
              <a className={styles.groupsLink} href="#">
                <img src="./image/profile/group.svg" alt="saved icon" />
                <span> Groups</span>
              </a>
            </li>
            <li>
              <a className={styles.eventsLink} href="#">
                <img src="./image/profile/events.svg" alt="saved icon" />
                <span> Events</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content of home */}
      <div>
        {/* CREATING NEW PUBLICATION */}
        <div className={styles.publishWrapper}>
          <div className={styles.blogPosting}>
            <a className={styles.photoContainer} href="#">
              <img src={profileData.profilePicture} alt="avatar" />
            </a>
            <input type="text" placeholder="New publication" />
          </div>
          <nav>
            <ul className={styles.shareBox}>
              <li>
                <button href="#">
                  <img src="./image/publication/media.svg" alt="mediaIcon" />
                  <span>Media</span>
                </button>
              </li>
              <li>
                <button href="#">
                  <img src="./image/publication/DataEvent.svg" alt="mediaIcon" />
                  <span>Event</span>
                </button>
              </li>
              <li>
                <button href="#">
                  <img src="./image/publication/Article.svg" alt="mediaIcon" />
                  <span>Write article</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* SORT BY CATEGORY */}
        <div className={styles.sortContainer}>
          <button className={styles.sortBtn}>
            <div className={styles.line}></div>
            <span className={styles.title}>Sort by:</span>
            <span className={styles.category}>Resent</span>
          </button>
        </div>
        {/* POSTS */}
        <ul className={styles.postListContainer}>
          <li className={styles.postWrapper}>
            <div className={styles.descriptionProfile}>
              <a className={styles.postAvatarContainer} href="#">
                <img src="./image/temporaryImgs/tempAvatar.png" alt="avatar" />
              </a>
              <div className={styles.profileData}>
                <h3 className={styles.nameProfile}>Your Band</h3>
                <p className={styles.followers}>26.548 followers</p>
                <p className={styles.specialization}>promoted</p>
              </div>
            </div>
            <div className={styles.postTextContainer}>
              <p className={styles.text}>
                Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Nesciunt ex eveniet explicabo rerum dolorum, architecto eum quam
                dicta dignissimos facilis, laudantium omnis nulla reprehenderit fugiat incidunt
                quasi? Rerum, qui deserunt?
              </p>
              <button className={styles.moreBtn}>...more</button>
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
        </ul>
      </div>

      {/* LEFT SIDEBAR */}

      <aside>
        
        <div className={styles.recommendationsContainer}>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Add to your feed </h2>
            <button className={styles.excludeBtn}></button>
          </div>
          <ul className={styles.usersListContainer}>
            <li className={styles.usersItemContainer}>
              <a className={styles.userAvatarContainer} href="#">
                <img src={profileData.profilePicture} alt="avatar" />
              </a>
              <div className={styles.infoContainer}>
                <p className={styles.userName}>Mykhailo Fedorov</p>
                <p className={styles.userInformation}>Lorem ipsum dolor sit amet consectetur</p>
                <button className={styles.followBtn}>Follow</button>
              </div>
            </li>
            <li className={styles.usersItemContainer}>
              <a className={styles.userAvatarContainer} href="#">
                <img src={profileData.profilePicture} alt="avatar" />
              </a>
              <div className={styles.infoContainer}>
                <p className={styles.userName}>Mykhailo Fedorov</p>
                <p className={styles.userInformation}>Lorem ipsum dolor sit amet consectetur</p>
                <button className={styles.followBtn}>Follow</button>
              </div>
            </li>
          </ul>
          <a className={styles.showMoreLink}>
            <p>See all recommendation</p>
            <span></span>
          </a>
        </div>
   

        <AsideFooter />
      </aside>
    </PageWrapper>
  );
}
