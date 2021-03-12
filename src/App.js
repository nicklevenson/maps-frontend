import logo from './logo.svg';
import './App.css';
import React from 'react'
import Map from './components/Map.js';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Map/>
      </div>
    );
  }
 
}

export default App;
