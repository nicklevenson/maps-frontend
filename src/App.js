import logo from './logo.svg';
import './App.css';
import React from 'react'
import MapContainer from './containers/MapContainer.js';

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
