import {GET_GENRES,GET_PLATFORMS,GET_VIDEOGAMES,GET_VIDEOGAME_BY_ID,CREATE_VIDEOGAME}from "../actions"
const initialState = {
  videogames: [],
  videogameDetail: [],
  genres:[],
  platforms:[]
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:return {...state}
  }
};

export default rootReducer;