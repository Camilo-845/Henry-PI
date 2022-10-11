import React from "react";
import styles from "../../styles/SearchBar.module.css"
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../redux/actions/index';
import store from '../../../redux/store'

const SearchBar= () =>{
    const dispatch = useDispatch()
    const [state, setState] = React.useState({
        name:""
  })
    const HandleChange=(e)=>{
        setState({
            ...state,
            [e.target.name]:e.target.value
        })
    }
    const HandleSubmit=(e)=>{
        async function SearchAndPage(){
            dispatch(actions.setLoading(true))
            await dispatch(actions.getVideogamesByName(state.name))
            var videogam = store.getState().videogames;
            await dispatch(actions.pageVideogames(videogam));
            dispatch(actions.setLoading(false))
        }
        SearchAndPage()
    }
    return (
        <div className={styles.mainContainer}>
            <input name="name" onChange={HandleChange} type="text" />
            <button onClick={HandleSubmit}>BUSCAR</button>
        </div>
      );
}

export default SearchBar;