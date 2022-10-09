import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions';
import styles from "../styles/VideogameCreate.module.css"
import { Link } from "react-router-dom"
import GenreCard from "./GenreCard"
import PlatformCard from "./PlatformCard"

const VideogameCreate = () => {
  const [state, setState] = React.useState({
    name: '',
    description: '',
    rating: '',
    released: '',
    background_image: '',
    genres: [],
    platforms: []
  })

  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(actions.getGenres())
  }, [])
  React.useEffect(() => {
    dispatch(actions.getPlatforms())
  }, [])


  const genres = useSelector(state => state.genres)
  const platforms = useSelector(state => state.platforms)

  const HandleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }
  const HandleSelectorChange = (e) => {
    if (e.target.value !== "0") {
      const [SelectorName, SelectorId] = e.target.value.split("#")
      if (state[e.target.name].filter(el => el.id === SelectorId).length === 0) {
        setState({
          ...state,
          [e.target.name]: [...state[e.target.name], ...[{ id: SelectorId, name: SelectorName }]],
        })
      }
    }
  }
  const HandleSubmit = (e) => {
    e.preventDefault()
    dispatch(actions.createVideogame(state))
  }

  function onClose(id, type) {
    setState({ ...state, [type]: state[type].filter(el => el.id !== id) });
  }

  return (
    <div className={styles.mainContainer}>
      <form onSubmit={(e) => HandleSubmit(e)}>
        <label >Name:   *</label>
        <input onChange={HandleChange} type="text" name="name" />
        <label >Description: </label>
        <textarea className={styles.descriptionInput} onChange={HandleChange} type="text" name="description" />
        <label >Rating: </label>
        <input onChange={HandleChange} type="number" step="0.1" name="rating" />
        <label >Fecha de lanzamiento: </label>
        <input onChange={HandleChange} type="date" name="released" />
        <label >Image URL: </label>
        <input onChange={HandleChange} type="text" name="background_image" />
        <label >Genres:   *</label>
        <div className={styles.selectContainer}>
          <select onChange={HandleSelectorChange} id="genres" name="genres">
            <option value="0">SELECT</option>
            {genres?.map(genre => {
              return (<option value={`${genre.name}#${genre.id}`} key={genre.id}>{genre.name.toUpperCase()}</option>
              )
            })}
          </select>
          <div className={styles.ObjectContainers}>
            {state.genres?.map(genre => {
              return (<GenreCard 
                key={genre.id} 
                id={genre.id} 
                name={genre.name}
                onClose={()=>onClose(genre.id,"genres")}
                ></GenreCard>)
            })}
          </div>
        </div>
        <label >Platforms:   *</label>
        <div className={styles.selectContainer}>
          <select
            onChange={HandleSelectorChange}
            id="platforms"
            name="platforms"
          >
            <option value={0}>SELECT</option>
            {platforms?.map(platform => {
              return (<option
                value={`${platform.name}#${platform.id}`}
                key={platform.id}>
                {platform.name.toUpperCase()}
              </option>
              )
            })}
          </select>
          <div className={styles.ObjectContainers}>
            {state.platforms?.map(platform => {
              return (
                <PlatformCard
                  key={platform.id}
                  id={platform.id}
                  name={platform.name}
                  onClose={()=>onClose(platform.id,"platforms")}
                ></PlatformCard>)
            })}
          </div>
        </div>
        <div className={styles.buttonsContainer}>
          <button className={styles.createbutton} type='submit'>CREATE</button>
          <Link to="/videogame">
            <button className={styles.cancelbutton} >CANCEL</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default VideogameCreate;