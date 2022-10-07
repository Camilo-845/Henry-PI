import React from "react";
import styles from "../styles/NotFound.module.css";
import image from "../../scr_img/browser-error-svgrepo-com.svg"


const Welcome = () => {
  return (
    <div className={styles.notfound}> 
      <h1>ERROR 404 NOT FOUND</h1>
      <img src={image} alt="errorImage" />
    </div>
  );
};

export default Welcome;