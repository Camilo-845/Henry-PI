import React from "react";
import styles from "../styles/Welcome.module.css"
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className={styles.main_container}>
      <img height="auto" src={require("../../scr_img/videogame.png").default} alt="hola"/>
      <Link to={`/videogame`} >
        <button>INGRESAR</button>
      </Link>
    </div>
  );
};

export default Welcome;
