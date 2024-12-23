import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./FriendsProfile.module.scss";
import { useNavigate } from "react-router-dom";
import {
  fetchQuantitySubscribed,
  fetchSubscriptions,
  fetchQuantitySubscribers,
  fetchFollowers,
} from "../../redux/slices/subscriptionSlice";
import NetItems from "../../components/NetItems";
import ProfileFooter from "../../components/ProfileFooter";

export default function FriendsProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { quantitySubscribed, subscribedData, quantitySubscribers, followersData } = useSelector(
    (state) => state.subscription
  );
  const userId = useSelector((state) => state.auth.userId);
  console.log("subscribedData", subscribedData);
  console.log("followersData", followersData);

  // Завантаження кількості підписок, якщо це значення null
  useEffect(() => {
    if (quantitySubscribed === null) {
      dispatch(fetchQuantitySubscribed(userId));
    }
  }, [dispatch, quantitySubscribed, userId]);

  // Завантаження підписок користувача, якщо кількість підписок була отримана
  useEffect(() => {
    if (quantitySubscribed !== null && quantitySubscribed > 0) {
      dispatch(fetchSubscriptions({ userId, page: 0, size: quantitySubscribed }));
    }
  }, [dispatch, quantitySubscribed, userId]);

  // Завантаження кількості , якщо це значення null
  useEffect(() => {
    if (quantitySubscribers === null) {
      dispatch(fetchQuantitySubscribers(userId));
    }
  }, [dispatch, quantitySubscribers, userId]);

  // Завантаження підписок користувача, якщо кількість підписок була отримана
  useEffect(() => {
    if (quantitySubscribers !== null && quantitySubscribers > 0) {
      dispatch(fetchFollowers({ userId, page: 0, size: quantitySubscribers }));
    }
  }, [dispatch, quantitySubscribers, userId]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentWrapper}>
        <NetItems
          title="Subscriptions"
          subscriptionData={subscribedData}
          quantitySubscription={quantitySubscribed}
        />
        <NetItems
          title="Followers"
          subscriptionData={followersData}
          quantitySubscription={quantitySubscribers}
        />
      </div>
      <ProfileFooter />
    </div>
  );
}
