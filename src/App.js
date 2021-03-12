import './App.css';
import React from 'react'
import {Switch, Route} from "react-router-dom";
import PublicMapContainer from './containers/PublicMapContainer.js';
import PersonalMapContainer from './containers/PersonalMapContainer.js';
import Nav from './components/Nav.js'


class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Nav/>
        <Switch>
          <Route exact path="/public-map" component={PublicMapContainer}></Route>
          <Route exact path="/my-map" component={PersonalMapContainer}></Route>
        </Switch>
      </div>
    );
  }
 
}

export default App;
