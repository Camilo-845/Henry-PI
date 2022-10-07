import React from "react";
import { useLocation } from "react-router-dom";
import * as actions from '../../redux/actions'
import { useDispatch, useSelector } from "react-redux";
import GenreCard from "./GenreCard";
import PlatformCard from "./PlatformCard"

const VideogameDetail = (props) => {
  const query = new URLSearchParams(useLocation().search);
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(actions.getVideogameById(props.match.params.id, query.get("belongs_db")))
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])
  const Videogame = useSelector(state => state.videogameDetail)
  return (
    <div>
      <img src={Videogame.background_image} alt={Videogame.name} />
      <h1>{Videogame.name}</h1>
      <h3>{Videogame.rating}</h3>
      <div>
        {Videogame.genres?.map((el) => {
          return <GenreCard key={el.id}
          id={el.id}
          name={el.name}
          ></GenreCard>
        })}
      </div>
      <h5>{`Fecha de lanzamiento: ${Videogame.released}`}</h5>
      <div dangerouslySetInnerHTML={{ __html: Videogame.description }}>
      </div>
      <div>
        {Videogame.platforms?.map((el) => {
          return <PlatformCard key={el.platform.id}
            id={el.platform.id}
            name={el.platform.name}
          ></PlatformCard>
        })}
      </div>
    </div>
  );
};

export default VideogameDetail;
