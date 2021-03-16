import './App.css';
import React from 'react'
import {Route} from "react-router-dom";
import MapContainer from './containers/MapContainer.js';
import { fetchMarkers } from './actions/MarkerActions.js';
import {fetchUser} from './actions/UserActions.js'
import {connect} from 'react-redux'  
import Nav from './components/Nav.js'
import Login from './components/Login.js'
import Logout from './components/Logout.js'

class App extends React.Component {
  state = {
    filteredMarkers: []
  }
  componentDidMount() {
    this.props.fetchMarkers()
    if (sessionStorage.jwt) {
      this.props.fetchUser()
    }
  }

  currentUserMarkers = () => {
    const liked = this.props.markers.filter(m=>this.props.currentUser.likedMarkers.map(m=>m.id).includes(m.id))
    return [...liked, ...this.props.currentUser.markers]
  }

  isRedirect = () => {
    if (!sessionStorage.jwt) {
      return <Login heading={'Please login to use this feature'}/> 
    }else {
      return <MapContainer markers={this.currentUserMarkers()} heading={"My Map"}/>
    }
  }

  render(){

    return (
      <div className="App">
        <Nav/>
          <Route exact path="/public-map" render={() => <MapContainer markers={this.props.markers} heading={"Public Map"}/> }></Route>
          <Route exact path="/my-map" render={()=>this.isRedirect()}></Route>
          <Route exact path="/login"><Login/></Route>
          <Route exact path="/logout"><Logout/></Route>
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
      markers: state.markers.filteredMarkers,
      currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

