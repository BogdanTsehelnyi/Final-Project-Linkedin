import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import styles from "./AnotherProfiles.module.scss";
import { useEffect } from "react";

import { fetchOtherProfiles } from "../../redux/slices/otherProfilesSlice";
import ShowMoreBtn from "../common/ShowMoreBtn";
import SmallPreloader from "../common/smallPreloader";
import FollowBtn from "../common/FollowBtn";
import { getFilteredItems } from "../../utils/filteredItems/getFilteredItems";
import {
  fetchQuantitySubscribed,
  fetchSubscriptions,
  fetchQuantitySubscribers,
  fetchFollowers,
} from "../../redux/slices/subscriptionSlice";

export default function AnotherProfiles() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.userId);
  const allProfiles = useSelector((state) => state.allProfiles.allProfilesData);
  // const { subscribedData } = useSelector((state) => state.subscription);

  // useEffect(() => {
  //   if (subscribedData.length === 0) {
  //     console.log("Запит відбувається тільки один раз");

  //     // Завантажуємо підписки лише якщо вони ще не завантажені
  //     dispatch(fetchSubscriptions({ userId }));
  //   }
  // }, [dispatch, subscribedData.length, userId]);

  // console.log(subscribedData, "subscribedData");

  // const recommendedProfiles = getFilteredItems(allProfiles, subscribedData, 10);

  // console.log("recommendedProfiles", recommendedProfiles);

  useEffect(() => {
    if (allProfiles.length === 0) {
      console.log("Запит відбувається тільки один раз");

      // Завантажуємо профілі лише якщо вони ще не завантажені
      dispatch(fetchOtherProfiles({ userId: userId, page: 0, limit: 7 }));
    }
  }, [allProfiles.length, dispatch, userId]);

  const isProfilesLoading = useSelector((state) => state.allProfiles.loading);
  console.log(isProfilesLoading);

  const handleNavigateToProfile = (id) => {
    navigate(`/friend/${id}`); // Навігація на сторінку профілю за ID
  };

  return (
    <div className={styles.container}>
      <h3 className={styles.anotherProfileTitle}>Another profile for you</h3>

      {isProfilesLoading ? (
        <SmallPreloader />
      ) : (
        <ul className={styles.profileList}>
          {allProfiles.map((profile) => (
            <li className={styles.profileItem} key={profile.profileId}>
              <div
                className={styles.photoContainer}
                onClick={() => handleNavigateToProfile(profile.profileId)}
              >
                <img
                  className={styles.anotherProfilePhoto}
                  src={profile.headerPhotoUrl || "/image/profile/photo_ava_default.png"}
                  alt={`${profile.name} ${profile.surname}`}
                />
              </div>
              <div className={styles.profileInfo}>
                <h3 className={styles.profileName}>
                  {isProfilesLoading ? "loading..." : `${profile.name} ${profile.surname}`}
                </h3>
                <p className={styles.profilePosition}>
                  {isProfilesLoading ? "loading..." : profile.position}
                </p>
                <FollowBtn followerId={userId} followingId={profile.userId} />
              </div>
            </li>
          ))}
          <ShowMoreBtn />
        </ul>
      )}
    </div>
  );
}
