import React, { useState } from "react";
import styles from "./FollowBtn.module.scss";
import {
  subscribeToUser,
  fetchQuantitySubscribed,
  fetchQuantitySubscribers,
  unsubscribeFromUser,
} from "../../../redux/slices/subscriptionSlice"; // Імпортуємо action creators
import { useDispatch } from "react-redux";
import classNames from "classnames";
import { useSelector } from "react-redux";

export default function FollowUnFollowBtn({ followerId, followingId }) {
  const dispatch = useDispatch();

  const [isFollowed, setIsFollowed] = useState(false);
  const { quantitySubscribed, subscribedData } = useSelector((state) => state.subscription);

  const handleFollowClick = async () => {
    try {
      // Виконуємо підписку на користувача
      const result = await dispatch(
        subscribeToUser({ followerId: followerId, followingId: followingId })
      );
      console.log("Результат виконання subscribeToUser:", result);

      // Після успішної підписки виконуємо запит на отримання кількості підписок
      if (result.meta.requestStatus === "fulfilled") {
        setIsFollowed(true);
        // dispatch(fetchQuantitySubscribed(followerId));
        // dispatch(fetchQuantitySubscribers(followerId));
      }
    } catch (error) {
      console.error("Помилка під час виконання subscribeToUser:", error);
    }
  };

  const handleUnFollowClick = async () => {
    try {
      // Виконуємо відписку від користувача
      const result = await dispatch(
        unsubscribeFromUser({ followerId: followerId, followingId: followingId })
      );
      console.log("Результат виконання unsubscribeFromUser:", result);

      // Після успішної відписки виконуємо запит на отримання кількості підписок
      if (result.meta.requestStatus === "fulfilled") {
        setIsFollowed(false);
        // dispatch(fetchQuantitySubscribed(followerId));
        // dispatch(fetchQuantitySubscribers(followerId));
      }
    } catch (error) {
      console.error("Помилка під час виконання unsubscribeFromUser:", error);
    }
  };

  const handleClick = () => {
    if (isFollowed) {
      handleUnFollowClick();
    } else {
      handleFollowClick();
    }
  };

  return (
    <button
      className={classNames(styles.baseBtn, {
        [styles.followBtn]: !isFollowed,
        [styles.unFollowBtn]: isFollowed,
      })}
      onClick={handleClick}
    >
      {isFollowed ? "Unfollow" : "Follow"}
    </button>
  );
}
