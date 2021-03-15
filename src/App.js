import './App.css';
import React from 'react'
import {Switch, Route} from "react-router-dom";
import MapContainer from './containers/MapContainer.js';
import { fetchMarkers } from './actions/MarkerActions.js';
import {connect} from 'react-redux'  
import Nav from './components/Nav.js'
import Login from './components/Login.js'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchMarkers()
  }

  render(){
    return (
      <div className="App">
        <Nav/>
        <Switch>
          <Route exact path="/public-map" render={() => <MapContainer markers={this.props.markers} heading={"Public Map"}/> }></Route>
          <Route exact path="/my-map" render={() => <MapContainer markers={this.props.currentUserMarkers} heading={"My Map"}/>}></Route>
          <Route exact path="/login" render={() => <Login/>}></Route>
        </Switch>
      </div>
    );
  }
 
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMarkers: () => dispatch(fetchMarkers())
  }
}


const mapStateToProps = (state) => {
  return {
      markers: state.markers.markers,
      currentUserMarkers: state.currentUser.currentUser.markers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

