import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../../redux/actions';
import styles from "../../styles/VideogameCreate.module.css"
import { Link} from "react-router-dom"
import GenreCard from "../secondaryComponents/GenreCard"
import PlatformCard from "../secondaryComponents/PlatformCard"
import Swal from 'sweetalert2'

const VideogameCreate = () => {

  const [errors, setErrors] = React.useState({
    globalError:true,
  })
  const [state, setState] = React.useState({
    name: '',
    description: '',
    rating: '',
    released: '',
    background_image: '',
    genres: [],
    platforms: []
  })
  
  function validate(state) {
    let errors = {globalError:false};
    if (state.name==="") {
      errors.globalError=true;
      errors.name = 'Name is required';
    }else if(!/[a-zA-ZñÑ]/.test(state.name)){
      errors.name ='Name no puede tener solo numeros'
      errors.globalError=true
    }
    // eslint-disable-next-line
    if ((!(state.background_image.length===0))&&!(/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(state.background_image))){
      errors.background_image = 'Image URL is not valid';
      errors.globalError=true
    }
    if((!(state.rating.length===0))&&!(state.rating>=1.0&&state.rating<=5.0)){
      errors.rating = 'El rating debe estar dentro de 1-5'
      errors.globalError=true
    }
    if(state.genres.length===0){
      errors.genres='Debe contener por lo menos un genero'
      errors.globalError=true
    }
    if(state.platforms.length===0){
      errors.platforms='Debe contener por lo menos una plataforma'
      errors.globalError=true
    }
    return errors;
  };

  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(actions.getGenres())
    dispatch(actions.getPlatforms())
  }, [dispatch])


  const genres = useSelector(state => state.genres)
  const platforms = useSelector(state => state.platforms)

  const HandleBlur= (e)=>{
    setErrors(validate({
      ...state,
      [e.target.name]: e.target.value
    }));
  }
  const HandleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }
  const HandleSelectorChange = (e) => {
    setErrors(validate({
      ...state,
      [e.target.name]: e.target.value
    }));
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
    Swal.fire(
      'CREATED',
      'You clicked the button!',
      'success'
    ).then(()=>{
      window.location = '/videogame'
    })
  }

  function onClose(id, type) {
    setState({ ...state, [type]: state[type].filter(el => el.id !== id) });
    setErrors(validate({
      ...state,
      [type]: state[type].filter(el => el.id !== id)
    }));
  }

  return (
    <div className={styles.mainContainer}>
      <form onSubmit={(e) => HandleSubmit(e)}>
        <label  >Name:   *</label>
        <input onBlur={HandleBlur} onChange={HandleChange} type="text" name="name" />
        {errors.name&&(
            <p className="danger">{errors.name}</p>
          )}
        <label >Description: </label>
        <textarea className={styles.descriptionInput} onChange={HandleChange} type="text" name="description" />
        <label >Rating: </label>
        <input onBlur={HandleBlur} onChange={HandleChange} type="number" step="0.1" name="rating" />
        {errors.rating&&(
            <p className="danger">{errors.rating}</p>
          )}
        <label >Fecha de lanzamiento: </label>
        <input onChange={HandleChange} type="date" name="released" />
        <label >Image URL: </label>
        <input onBlur={HandleBlur} onChange={HandleChange} type="text" name="background_image" />
        {errors.background_image&&(
            <p className="danger">{errors.background_image}</p>
          )}
        <label >Genres:   *</label>
        <div className={styles.selectContainer}>
          <select 
          onChange={HandleSelectorChange} 
          id="genres" 
          name="genres">
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
        {errors.genres&&(
            <p className="danger">{errors.genres}</p>
          )}
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
        {errors.platforms&&(
            <p className="danger">{errors.platforms}</p>
          )}
        <div className={styles.buttonsContainer}>
          <button 
          disabled={errors.globalError}
          className={styles.createbutton} 
          type='submit'
          >CREATE</button>
          <Link to="/videogame">
            <button className={styles.cancelbutton} >CANCEL</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default VideogameCreate;