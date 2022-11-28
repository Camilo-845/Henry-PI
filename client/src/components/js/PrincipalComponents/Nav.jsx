import React from "react";
import styles from "../../styles/Nav.module.css"
import image from "../../../scr_img/videogame-svgrepo-com.svg"
import { Link } from "react-router-dom";
const Nav = () => {
  const [state, setState] = React.useState({
    currentRoute: "Home",
  })
  const HandleChange = (name) => {
    setState({
      ...state,
      currentRoute: name
    })
  }
  return (
    <div className={styles.nav}>
      <div onClick={() => HandleChange("Home")} name="Home" className={styles.navLogo}>
        <img src={image} alt="Icon" />
        <h1 >VIDEOGAMES</h1>
      </div>
      <div className={styles.routesContainer}>
        <Link style={{ textDecoration: 'none'}} to="/videogame">
          <div onClick={() => HandleChange("Home")}>
            <h5 name="Home" className={(state.currentRoute === "Home") ? styles.currentRoute : styles.routes}>Home</h5>
          </div>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/videogame/create">
          <div onClick={() => HandleChange("Create")}>
            <h5 name="Create" className={(state.currentRoute === "Create") ? styles.currentRoute : styles.routes}>Create</h5>
          </div>
        </Link>
        <Link style={{ textDecoration: 'none' }} to="/about">
          <div onClick={() => HandleChange("About")}>
            <h5 name="About" className={(state.currentRoute === "About") ? styles.currentRoute : styles.routes}>About</h5>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Nav;