import './App.css';
import React from 'react'
import {Route, Redirect} from "react-router-dom";
import MapContainer from './containers/MapContainer.js';
import { fetchMarkers } from './actions/MarkerActions.js';
import {fetchUser} from './actions/UserActions.js'
import {connect} from 'react-redux'  
import Nav from './components/Nav.js'
import Login from './components/Login.js'

class App extends React.Component {
  state =  {
    redirect: false
  }

  componentDidMount() {
    this.props.fetchMarkers()
    if (sessionStorage.jwt) {
      this.props.fetchUser()
    }else{
      this.setState({redirect: true})
    }
  }

  isRedirect = () => {
    if (this.state.redirect) {
      return <Login heading={'Please login to use this feature'}/> 
    }else {
      return <MapContainer markers={this.props.markers.filter(m => m.user_id === this.props.currentUser.id)} heading={"My Map"}/>
    }
  }

  render(){

    return (
      <div className="App">
        <Nav/>
          <Route exact path="/public-map" render={() => <MapContainer markers={this.props.markers} heading={"Public Map"}/> }></Route>
          <Route exact path="/my-map" render={this.isRedirect}></Route>
          <Route exact path="/login" render={() => <Login/>}></Route>
      </div>
    );
  }
 
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMarkers: () => dispatch(fetchMarkers()),
    fetchUser: () => dispatch(fetchUser())
  }
}


const mapStateToProps = (state) => {
  return {
      markers: state.markers.markers,
      currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

