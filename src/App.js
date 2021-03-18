import './App.css';
import React from 'react'
import {Route} from "react-router-dom";
import MapContainer from './containers/MapContainer.js';
import { fetchMaps} from './actions/MapActions.js';
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
    this.props.fetchMaps()
    if (sessionStorage.jwt) {
      this.props.fetchUser()
    }
  }

  isRedirect = () => {
    if (!sessionStorage.jwt) {
      return <Login heading={'Please login to use this feature'}/> 
    }else {
      return <MapContainer map={this.props.selectedMap} heading={"My Maps"}/>
    }
  }

  handlePublicMap = () => {
    if (sessionStorage.jwt) {
      if (this.props.selectedMap.public === true || this.props.currentUser.maps.map(m=>m.id).includes(this.props.selectedMap.id)){
        return this.props.selectedMap
      }else{
        return {markers: []}
      }
    }else {
      if (this.props.selectedMap.public === true){
        return this.props.selectedMap
      }else{
        return {markers: []}
      }
    }
  
  }

  render(){

    return (
      <div className="App">
        <Nav/>
          <Route exact path="/public-maps" render={() => <MapContainer map={this.handlePublicMap()} heading={"Public Maps"}/> }></Route>
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
    fetchUser: () => dispatch(fetchUser())
  }
}


const mapStateToProps = (state) => {
  return {
      selectedMap: state.maps.selectedMap,
      currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

