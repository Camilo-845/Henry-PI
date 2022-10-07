import React from "react";
import styles from "../styles/PlatformCard.module.css"

const PlatformCard = (props) => {
  return (
    <div className={styles.mainContainer}>
        <h4>{props.name}</h4>
    </div>
  );
};

export default PlatformCard;