import React from "react";
import { useLocation } from "react-router-dom";
import * as actions from '../../../redux/actions'
import { useDispatch, useSelector } from "react-redux";
import GenreCard from "../SecondaryComponents/GenreCard";
import PlatformCard from "../SecondaryComponents/PlatformCard"
import styles from "../../styles/VideogameDetail.module.css"

const VideogameDetail = (props) => {
  const query = new URLSearchParams(useLocation().search);
  const dispatch = useDispatch()
  React.useEffect(() => {
    async function getVideogame() {
      dispatch(actions.setLoading(true))
      await dispatch(actions.getVideogameById(props.match.params.id, query.get("belongs_db")))
      dispatch(actions.setLoading(false))
    }
    getVideogame()
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])
  const Videogame = useSelector(state => state.videogameDetail)
  const IsLoading = useSelector(state => state.isLoading)
  return (
    <div className={styles.mainContainer}>
      {(IsLoading) &&
        <h1>Loading...</h1>
      }
      {(!IsLoading) &&
        <>
          <img src={Videogame.background_image} alt={Videogame.name} />
          <div className={styles.infoContainer}>
            <h1>{Videogame.name}</h1>
            <h3>{Videogame.rating}</h3>
            <div>
              {Videogame.genres?.map((el) => {
                return <GenreCard
                  key={el.id}
                  id={el.id}
                  name={el.name}
                ></GenreCard>
              })}
            </div>
            <div dangerouslySetInnerHTML={{ __html: Videogame.description }}>
            </div>
            <div>
              {Videogame.platforms?.map((el) => {
                return <PlatformCard
                  key={el.id}
                  id={el.id}
                  name={el.name}
                ></PlatformCard>
              })}
            </div>
            <h5>{`Fecha de lanzamiento: ${Videogame.released}`}</h5>
          </div>
        </>
      }
    </div>
  );
};

export default VideogameDetail;
