import React from "react";
import PageWrapper from "../../components/Wrappers/PageWrapper";
import ProfileDescBar from "../../components/ProfileDescBar";
import styles from "./Home.module.scss";

export default function Home() {
  return (
    <PageWrapper>
      <aside className={styles.leftSideBar}>
        <ProfileDescBar />

        {/* <div>
          <p>Unlock Premium tools & insights</p>
          <p>Try Premium for UAH0</p>
        </div>

        <a>
          <p>Conections</p>
          <p>10</p>
          <p>Grow your network</p>
        </a> */}

        {/* <nav>
          <ul>
            <li>
              <a href="#">Saved items</a>
            </li>
            <li>
              <a href="#">Groups</a>
            </li>
            <li>
              <a href="#">Events</a>
            </li>
          </ul>
        </nav> */}
      </aside>

      {/* POST */}
      {/* <div>
        <div>
          <a href="#">
            <img src="#" alt="avatar" />
          </a>
          <input type="text" placeholder="Start a post" />
        </div>
        <nav>
          <ul>
            <li>
              <a href="#">Media</a>
            </li>
            <li>
              <a href="#">Event</a>
            </li>
            <li>
              <a href="#">Write article</a>
            </li>
          </ul>
        </nav>
      </div> */}

      {/* LEFT SIDEBAR */}

      {/* <div className={styles.recommendationsContainer}>
        <h2>Add to your feed </h2>
        <ul>
          <li>
            <a href="#">
              <img src="#" alt="avatar" />
            </a>
            <div>
              <p>Mykhailo Fedorov</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur mollitia ea
                nobis
              </p>
              <button>Follow</button>
            </div>
          </li>
        </ul>
      </div> */}
    </PageWrapper>
  );
}
