import React from "react";
import styles from "../styles/GenreCard.module.css"

const GenreCard = (props) => {
  return (
    <div className={styles.mainContainer}>
        <h4>{props.name}</h4>
    </div>
  );
};

export default GenreCard;
