import React from "react";
import styles from "../styles/Nav.module.css"
import image from "../../scr_img/videogame-svgrepo-com.svg"
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <div className={styles.nav}>
      <Link style={{ textDecoration: 'none' }} to="/videogame">
      <div className={styles.navLogo}>
        <img src={image} alt="Icon" />
        <h1>VIDEOGAMES</h1>
      </div>
      </Link>
    </div>
  );
};

export default Nav;