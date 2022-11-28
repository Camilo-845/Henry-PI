import React from "react";
import styles from "../../styles/Welcome.module.css"
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className={styles.main_container}>
      <img  src={require("../../../scr_img/Control_2.png").default} alt="hola"/>
      <Link to={`/videogame`} >
      <img className={styles.image_2} src={require("../../../scr_img/Vanilla-1s-286px.svg").default} alt="hola"/>
      </Link>
    </div>
  );
};

export default Welcome;
