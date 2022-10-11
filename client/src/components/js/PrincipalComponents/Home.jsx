import React, { Component } from "react";
import styles from "../../styles/Home.module.css"
import { connect } from "react-redux";
import VideoGames from "../SecondaryComponents/VideoGames";
import SearchBar from "../SecondaryComponents/SearchBar";
import Filter from "../SecondaryComponents/Filter";
import { Link } from "react-router-dom";


export class Home extends Component {
  render() {
    return (
      <div className={styles.contendor}>
        <div className={styles.SearchBar}>
          <SearchBar></SearchBar>
          <Link to={"videogame/create"}>
            <button className={styles.createButton}>+</button>
          </Link>
        </div>
        <Filter></Filter>
        <div className={styles.gamesContainer}>
          <VideoGames></VideoGames>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    videogames: state.videogames
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
