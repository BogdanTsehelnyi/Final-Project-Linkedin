import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ButtonMessage.module.scss";

export default function ButtonMessage({id}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/messages/chat/${id}`);
  };

  return (
    <button className={styles.baseBtn} onClick={handleNavigate}>Message</button>
  );
}
