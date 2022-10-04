import React from "react";
import {Route}from 'react-router-dom';
import{Welcome,Home,VdeogameDetail,VideogameCreate} from "./components";

function App() {
  return (
    <div className="App">
      <Route path='/' component={Welcome}/>
      <Route path='/videogame' component={Home}/>
      <Route path='/videogame/:idVideogame' component={VdeogameDetail}/>
      <Route path='/videogame/create' component={VideogameCreate}/>
    </div>
  );
}

export default App;
