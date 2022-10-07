import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import{Welcome,Home,Videogame,VideogameCreate,NotFound,Nav} from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Nav></Nav>
        <Switch>
          <Route exact path='/' component={Welcome}/>
          <Route exact path='/videogame' component={Home}/>
          <Route path='/videogame/create' component={VideogameCreate}/>
          <Route path='/videogame/:id' component={Videogame}/>
          <Route path='*' component={NotFound}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
