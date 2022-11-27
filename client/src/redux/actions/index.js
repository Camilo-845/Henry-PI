/* import axios from "axios"; */
export const BACKEND_URL="http://localhost:3001/"/* "https://henry-videogames-api.onrender.com/" *//* "https://henry-pi-api.up.railway.app/" */
export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMES_BY_NAME = "GET_VIDEOGAMES_BY_NAME";
export const GET_VIDEOGAME_BY_ID = "GET_VIDEOGAME_BY_ID";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const PAGE_VIDEOGAMES='PAGE_VIDEOGAMES'
export const SET_LOADING='SET_LOADING'
export const SET_CURRENT_PAGE='SET_CURRENT_PAGE'

export const setCurrentPage=(page)=>{
    return{
        type:SET_CURRENT_PAGE,
        payload:page
    }
}
export const setLoading=(bool)=>{
    return{
        type:SET_LOADING,
        payload:bool
    }
}
export const pageVideogames=(videogames)=>{
    let pages= Math.ceil(videogames.length/15);
    let videogamesArr= [];
    for(let i=0;i<pages;i++){
        videogamesArr.push(videogames.slice(i*15,(i+1)*15))
    }
    return{
        type:PAGE_VIDEOGAMES,
        payload:{videogamesArr,pages}
    }
}

export const getVideogames = () => {
    return function(dispatch){
        return fetch(`${BACKEND_URL}videogames`)
        .then((response)=>response.status===204?[]:response.json())
        .then(data=>{
            dispatch({type:GET_VIDEOGAMES,payload:data})
        })
    }
};
export const getVideogamesByName = (name) => {
    return function(dispatch){
        return fetch(`${BACKEND_URL}videogames?name=${name}`)
        .then((response)=>response.status===204?[]:response.json())
        .then(data=>{
            dispatch({type:GET_VIDEOGAMES_BY_NAME,payload:data})
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
    return function(dispatch){
        if(Videogame.background_image==="")delete Videogame.background_image
        if(Videogame.released==="")delete Videogame.released
        if(Videogame.rating==="")delete Videogame.rating
        return fetch(`${BACKEND_URL}videogame`,{
          method:"POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            name:Videogame.name,
            description:Videogame.description,
            rating:Videogame.rating,
            released:Videogame.released,
            background_image:Videogame.background_image,
            genres:Videogame.genres,
            platforms:Videogame.platforms,
          }),
        })
        .then(response=>response.json())
        .then(data=>{
            dispatch({type:CREATE_VIDEOGAME,payload:data})
        })
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