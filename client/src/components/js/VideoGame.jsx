import React from "react";
import styles from "../styles/VideoGame.module.css"
import { Link } from "react-router-dom";

const VideoGame = (props) => {
    var query_param=""
    if(props.belongsDb)query_param="?belongsDb=true"
  return (
    <Link style={{ textDecoration: 'none' }} to={`/videogame/${props.id}${query_param}`}>
        <div className={styles.main_container}>
                <img src={props.background_image} alt="" />
                <div>
                    <h2>{props.name}</h2>
                    <div>
                        <h2>{props.genres}</h2>
                    </div>
                </div>
        </div>
    </Link>
  );
};

export default VideoGame;