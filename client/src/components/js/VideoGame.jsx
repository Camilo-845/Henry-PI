import React from "react";
import styles from "../styles/VideoGame.module.css"
import { Link } from "react-router-dom";
import GenreCard from "./GenreCard"

const VideoGame = (props) => {
  var query_param = ""
  if (props.belongs_db) {
    query_param = "?belongs_db=true"}
    else{
    query_param = "?belongs_db=false"
  }
  return (
    <Link style={{ textDecoration: 'none' }} to={`/videogame/${props.id}${query_param}`}>
      <div className={styles.main_container}>
        <img src={props.background_image} alt="" />
        <div className={styles.infoContainer}>
          <h2>{props.name}</h2>
          <div className={styles.genresContainer}>
            {props.genres?.map(genre => {
              return (
                <div key={genre.id}>
                  <GenreCard
                    id={genre.id}
                    name={genre.name}
                  ></GenreCard>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoGame;