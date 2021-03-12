import './App.css';
import React from 'react'
import MapContainer from './containers/MapContainer.js';
import {Switch, Route} from "react-router-dom";

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <MapContainer/>
      </div>
    );
  }
 
}

export default App;
