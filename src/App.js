import './App.css';
import React from 'react'
import {Switch, Route} from "react-router-dom";
import MapContainer from './containers/MapContainer.js';

import Nav from './components/Nav.js'


class App extends React.Component {

  render(){
    return (
      <div className="App">
        <Nav/>
        <Switch>
          <Route exact path="/public-map" render={() => <MapContainer markers={this.props.markers} heading={"Public Map"}/> }></Route>
          <Route exact path="/my-map" render={() => <MapContainer markers={this.props.markers} heading={"My Map"}/>}></Route>
        </Switch>
      </div>
    );
  }
 
}


export default App

