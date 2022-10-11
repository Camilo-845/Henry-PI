import {GET_GENRES,
  GET_PLATFORMS,
  GET_VIDEOGAMES,
  GET_VIDEOGAME_BY_ID,
  GET_VIDEOGAMES_BY_NAME,
  CREATE_VIDEOGAME,
  SET_LOADING,
  SET_CURRENT_PAGE,
  PAGE_VIDEOGAMES}
  from "../actions"

const initialState = {
  videogames: [],
  pagedVideogames:[],
  videogameDetail: [],
  genres:[],
  platforms:[],
  pages:[],
  currentPage:0,
  isLoading:false,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEOGAMES_BY_NAME:
      return{
        ...state,
        videogames:action.payload
      }
    case SET_CURRENT_PAGE:
      return{
        ...state,
        currentPage:action.payload
      }
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames:action.payload
      }
    case GET_VIDEOGAME_BY_ID:
      return {
        ...state,
        videogameDetail:action.payload
      }
    case CREATE_VIDEOGAME:
      return {
        ...state,
        videogames:[...state.videogames,action.payload]
      }
    case GET_GENRES:
      return {
        ...state,
        genres:action.payload
      }
    case GET_PLATFORMS:
      return {
        ...state,
        platforms:action.payload
      }
    case PAGE_VIDEOGAMES:
      return {
        ...state,
        pagedVideogames:action.payload.videogamesArr,
        pages:action.payload.pages,
        currentPage:0
      }
    case SET_LOADING:
      return{
        ...state,
        isLoading:action.payload
      }
    default:return {...state}
  }
};

export default rootReducer;