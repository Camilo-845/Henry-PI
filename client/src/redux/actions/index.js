/* import axios from "axios"; */
export const BACKEND_URL="http://localhost:3001/"
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAME_BY_ID = "GET_VIDEOGAME_BY_ID";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";

export const getVideogames = () => {
    return function(dispatch){
        return fetch(`${BACKEND_URL}videogames`)
        .then((response)=>response.json())
        .then(data=>{
            dispatch({type:GET_VIDEOGAMES,payload:data})
        })
    }
};
export const getVideogameById = (IdVideogame,belongsDb) => {
    var DbParams="";
    if(belongsDb)DbParams+=`?belongs_db=${belongsDb}`
    return function(dispatch){
        return fetch(`${BACKEND_URL}videogame/${IdVideogame}${DbParams}`)
        .then(response=>response.json())
        .then(data=>{
            dispatch({type:GET_VIDEOGAME_BY_ID,payload:data})
        })
    }
};
export const createVideogame = (Videogame) => {
    return {
        type:CREATE_VIDEOGAME,
        payload:{
            name:Videogame.name,
            description:Videogame.description,
            rating:Videogame.rating,
            realised:Videogame.realised,
            background_image:Videogame.background_image,
            genres:Videogame.genres,
            platforms:Videogame.platforms,
        }
    }
};
export const getGenres = () => {
    return function(dispatch){
        return fetch(`${BACKEND_URL}genres`)
        .then((response)=>response.json())
        .then(data=>{
            dispatch({type:GET_GENRES,payload:data})
        })
    }
};
export const getPlatforms = () => {
    return function(dispatch){
        return fetch(`${BACKEND_URL}platforms`)
        .then((response)=>response.json())
        .then(data=>{
            dispatch({type:GET_PLATFORMS,payload:data})
        })
    }
};