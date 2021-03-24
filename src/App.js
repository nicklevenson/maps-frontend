import './App.css';
import React from 'react'
import {Route, Redirect} from "react-router-dom";
import MapContainer from './containers/MapContainer.js'

import { fetchMaps, filterMaps} from './actions/MapActions.js';
import {fetchUser, fetchAllUsers} from './actions/UserActions.js'
import {connect} from 'react-redux'  
import Nav from './components/Nav.js'
import Login from './components/Login.js'
import Logout from './components/Logout.js'
import Heading from './components/Heading';

class App extends React.Component {

  componentDidMount() {
    if (window.location.pathname === "/") {
      window.location.pathname = '/public-maps'
    }else{
      this.props.fetchMaps()
      this.props.fetchAllUsers()
      if (sessionStorage.jwt) {
        this.props.fetchUser()
      }
    }
    this.props.filterMaps("")
   
  }

  isRedirect = () => {
    if (!sessionStorage.jwt) {
      return <Login heading={'Please login to use this feature'}/> 
    }else {
      return <MapContainer/>
    }
  }

  render(){
    return (
      <div className="App">
        <Heading />
        <Nav currentUser={this.props.currentUser}/> 
        <Route exact path="/public-maps" render={() => <MapContainer/> }></Route>
        <Route exact path="/my-maps" render={()=>this.isRedirect()}></Route>
        <Route exact path="/login"><Login/></Route>
        <Route exact path="/logout"><Logout/></Route>
      </div>
    );
  }
 
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMaps: () => dispatch(fetchMaps()),
    fetchUser: () => dispatch(fetchUser()),
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    filterMaps: (title) => dispatch(filterMaps(title))
  }
}


const mapStateToProps = (state) => {
  return {
      selectedMap: state.maps.selectedMap,
      currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

