import React from "react";
import styles from "../../styles/VideoGames.module.css"
import VideoGame from "./VideoGame";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../redux/actions/index';
import store from '../../../redux/store'
import Pages from "../SecondaryComponents/Pages";

const VideoGames = () => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    async function paginar() {
      dispatch(actions.setLoading(true))
      await dispatch(actions.getVideogames())
      var videogam = store.getState().videogames;
      await dispatch(actions.pageVideogames(videogam));
      dispatch(actions.setLoading(false))
    }
    paginar();
  }, [dispatch])

  const pagedVideogames = useSelector(state => state.pagedVideogames)
  const currentPage = useSelector(state => state.currentPage)
  const IsLoading = useSelector(state=>state.isLoading)
  if(IsLoading){
    return(
      <h1 className={styles.notFound}>Loading...</h1>
    )
  }
  return (
    <div className={styles.mainContainer}>
      <Pages></Pages>
      <div className={styles.videogamesContainer}>
      {(pagedVideogames.length===0)&&
        <h1 className={styles.notFound}>Videogames not found</h1>
      }
      {pagedVideogames[currentPage]?.map(videogame => {
        return (
          <div className={styles.videogameContainer} key={videogame.id}>
            <VideoGame
              key={videogame.id}
              id={videogame.id}
              name={videogame.name}
              genres={videogame.genres}
              rating={videogame.rating}
              background_image={videogame.background_image}
              belongs_db={videogame.belongs_db}
              ></VideoGame>
          </div>
        )
      })}
      </div>
      <Pages></Pages>
    </div>
  );
};

export default VideoGames;