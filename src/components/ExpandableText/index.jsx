import React, { useState } from "react";
import styles from "./ExpandableText.module.scss";

const ExpandableText = ({ text, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const displayedText = isExpanded ? text : `${text.slice(0, maxLength)}...`;

  return (
    <>
      <p className={styles.text}>{displayedText}</p>
      {text.length > maxLength && (
        <button className={styles.expandBtn} onClick={toggleExpand}>
          {isExpanded ? "less" : "more"}
        </button>
      )}
    </>
  );
};

export default ExpandableText;
