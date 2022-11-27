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
      <Link style={{ textDecoration: 'none' }}   to="/videogame">
        <div onClick={()=>HandleChange("Home")} name="Home" className={styles.navLogo}>
          <img src={image} alt="Icon" />
          <h1 >VIDEOGAMES</h1>
        </div>
      </Link>
      <div className={styles.routesContainer}>
        <Link style={{ textDecoration: 'none' }} to="/videogame">
          <h5 onClick={()=>HandleChange("Home")} name="Home"className={(state.currentRoute==="Home")?styles.currentRoute:styles.routes}>Home</h5>
        </Link>
        <Link style={{ textDecoration: 'none' }}   to="/videogame/create">
          <h5 onClick={()=>HandleChange("Create")} name="Create" className={(state.currentRoute==="Create")?styles.currentRoute:styles.routes}>Create</h5>
        </Link>
        <Link style={{ textDecoration: 'none' }}   to="/about">
          <h5 onClick={()=>HandleChange("About")} name="About" className={(state.currentRoute==="About")?styles.currentRoute:styles.routes}>About</h5>
        </Link>
      </div>
    </div>
  );
};

export default Nav;