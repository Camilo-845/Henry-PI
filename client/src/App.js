import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import{Welcome,Home,VideogameDetail,VideogameCreate,NotFound,Nav} from "./components";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path='/' component={Welcome}/>
          <>
          <Nav></Nav>
          <Switch>
          <Route exact path='/videogame' component={Home}/>
          <Route path='/videogame/create' component={VideogameCreate}/>
          <Route path='/videogame/:id' component={VideogameDetail}/>
          <Route path='*' component={NotFound}/>
          </Switch> 
          </> 
        </Switch>
      </Router>
    </div>
  );
}

export default App;
