import React from "react";
import styles from "../../styles/VideoGame.module.css"
import { Link } from "react-router-dom";
import GenreCard from "./GenreCard"

const VideoGame = (props) => {
  var query_param = ""
  if (props.belongs_db) {
    query_param = "?belongs_db=true"}
    else{
    query_param = "?belongs_db=false"
  }
  const HandleClick = (e) => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;   
}
  return (
    <Link onClick={HandleClick} style={{ textDecoration: 'none' }} to={`/videogame/${props.id}${query_param}`}>
      <div className={styles.main_container}>
        <div className={styles.ratingContainer}>
          <img src="https://cdn-icons-png.flaticon.com/128/1954/1954760.png" alt="start_image" />
          <h4>{props.rating}</h4>
        </div>
        <img src={props.background_image} alt="background" />
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