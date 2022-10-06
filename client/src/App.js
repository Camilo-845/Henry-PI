import React from "react";
import {Route}from 'react-router-dom';
import{Welcome,Home,Videogame,VideogameCreate} from "./components";

function App() {
  return (
    <div className="App">
      <Route exact path='/' component={Welcome}/>
      <Route path='/videogame' component={Home}/>
      <Route path='/videogame/:idVideogame' component={Videogame}/>
      <Route path='/videogame/create' component={VideogameCreate}/>
    </div>
  );
}

export default App;
