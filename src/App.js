import logo from './logo.svg';
import './App.css';
import React from 'react'
import MyComponent from './MyComponent.js';

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <MyComponent/>
      </div>
    );
  }
 
}

export default App;
