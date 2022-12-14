import React from "react";
import styles from "../../styles/Filter.module.css"
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../redux/actions/index';

const Filter = () => {
    const dispatch = useDispatch()

    React.useEffect(() => {
        dispatch(actions.getGenres())
    }, [dispatch])
    const genres = useSelector(state => state.genres)
    
    const [state, setState] = React.useState({
        created: false,
        genre: "",
        sort: ""
    })
    
    const videogames= useSelector(state=>state.videogames)
    const HandleSelectorChange = (e) => {
        setState({
            ...state,
            [e.target.name]:e.target.name==="created"?e.target.checked:e.target.value
        })
    }
    React.useEffect(()=>{
        var videogamesArr=[...videogames]
        if(state.created){
            videogamesArr=videogamesArr.filter(el=>el.belongs_db===true)
        };
        if(state.genre!==""){
            videogamesArr=videogamesArr.filter(videogame=>{
                let hasGenre=false;
                videogame.genres.forEach(genre => {
                    if(genre.id.toString()===state.genre)hasGenre=true
                });
                return hasGenre
            })
        }
        if(state.sort!==""){
            var type
            var value
            switch(state.sort){
                case "A-Z":
                    type="name";
                    value=1;
                    break;
                case "Z-A":
                    type="name";
                    value=-1;
                    break;
                case "Max-Rating":
                    type="rating";
                    value=-1;
                    break;
                case "Min-Rating":
                    type="rating";
                    value=1;
                    break;
                default:
                    type="name";
                    value=1;
                    break;
            }
            videogamesArr=videogamesArr.sort((a,b)=>{
                if(a[type]>b[type]){
                    return (1*value);
                }
                if(a[type]<b[type]){
                    return (-1*value);
                }
                return 0;
            })
        }
        dispatch(actions.pageVideogames(videogamesArr))
        // eslint-disable-next-line
    },[state])

    
    return (
        <div className={styles.mainContainer}>
            <img src="https://cdn-icons-png.flaticon.com/128/2769/2769156.png" alt="filterImg" />
            <div>
            <label >Created: </label>
            < input 
            className={styles.inputCheckBox}
            name="created"
            onChange={HandleSelectorChange} 
            type="checkbox" />
            </div>
            <div>
            <label >Genre: </label>
            <select
                name="genre"
                onChange={HandleSelectorChange}
                id="genres">
                <option value="">SELECT</option>
                {genres?.map(genre => {
                    return (<option value={`${genre.id}`} key={genre.id}>{genre.name.toUpperCase()}</option>
                    )
                })}
            </select>
            </div>
            <div>
            <label >Sort: </label>
            <select
                name="sort"
                onChange={HandleSelectorChange}
                id="genres">
                <option value="">none</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="Max-Rating">Max-Rating</option>
                <option value="Min-Rating">Min-Rating</option>
            </select>
            </div>
        </div>
    );
}

export default Filter;