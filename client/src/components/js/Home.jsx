import React, { Component } from "react";
import * as actions from '../../redux/actions/index';
import styles from "../styles/Home.module.css"
import VideoGame from "./VideoGame";
import { connect } from "react-redux";

export class Home extends Component {
  componentDidMount(){
    this.props.getVideogames()
  }
  render() {
    return (
      <div className={styles.contendor}>
        <div className={styles.searchBar}>
          <button>GENERO</button>
          <button>EXISTENTES</button>
          <button>A-Z</button>
          <input type="search" />
          <button>O\</button>
          <button>+</button>
        </div>
        <div className={styles.gamesContainer}>
          {this.props.videogames?.map(videogame=>{return(
            <div key={videogame.id}>
              <VideoGame
              id= {videogame.id}
              name= {videogame.name}
              genres= {videogame.genres}
              rating={videogame.rating}
              background_image= {videogame.background_image}
              ></VideoGame>
            </div>
        )})}
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    videogames:state.videogames
  }
 }

export const mapDispatchToProps = (dispatch) => { 
  return {
    getVideogames: ()=>dispatch(actions.getVideogames())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
