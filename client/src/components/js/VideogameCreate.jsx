import React from "react";
import { useDispatch } from "react-redux";
import * as actions from '../../redux/actions';
import styles from "../styles/VideogameCreate.module.css"

const VideogameCreate = () => {

  const dispatch = useDispatch()

  const HandleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }
  /*   const HandleSubmit = (e) =>{
      e.preventDefault(),
      dispatch(actions.createVideogame(state))
    } */
  const [state, setState] = React.useState({
    name: '',
    description: '',
    rating: '',
    released:'',
    background_image: '',
    genres: [],
    platforms: []
  })
  return (
    <div className={styles.mainContainer}>
      <form onSubmit={(e) => console.log(e)/* HandleSubmit(e) */}>
        <label >Name:   *</label>
        <input onChange={HandleChange} type="text" name="name" />
        <label >Description: </label>
        <textarea className={styles.descriptionInput} onChange={HandleChange} type="text" name="description" />
        <label >Rating: </label>
        <input onChange={HandleChange} type="number" name="rating" />
        <label >Fecha de lanzamiento: </label>
        <input onChange={HandleChange} type="date" name="released" />
        <label >Image URL: </label>
        <input onChange={HandleChange} type="text" name="background_image" />
        <label >Genres:   *</label>
        <div className={styles.selectContainer}>
        <select id="country" name="country">
          <option value="0">SELECT</option>
          <option value="au">Australia</option>
          <option value="ca">Canada</option>
          <option value="usa">USA</option>
        </select>
          <div></div>
        </div>
        <label >Platforms:   *</label>
        <div className={styles.selectContainer}>
          <select id="country" name="country">
           <option value="0">SELECT</option>
            <option value="au">Australia</option>
            <option value="ca">Canada</option>
            <option value="usa">USA</option>
          </select>
          <div></div>
        </div>
        <div className={styles.buttonsContainer}>
          <button className={styles.createbutton} type='submit'>CREATE</button>
          <button className={styles.cancelbutton} >CANCEL</button>
        </div>
      </form>
    </div>
  );
};


export default VideogameCreate;