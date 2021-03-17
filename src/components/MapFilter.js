import React from 'react'
import {connect} from 'react-redux'
import {filterMaps} from '../actions/MapActions.js'
import { fetchAllUsers } from '../actions/UserActions.js'
class MapFilter extends React.Component {
  
  componentDidMount() {
    // this.props.fetchAllUsers()
    // this.renderUserOptions()
    // this.props.filterMaps("")
    this.renderMapOptions()
  }
  

  handleChange = (e) => {
    if (e.target.value === ""){
      this.props.filterMaps("")
    }else{
      this.props.filterMaps(e.target.value)
    }  
  }
  renderMapOptions = () => {
    if (window.location.pathname === "/my-map"){
      return this.props.currentUser.maps.map(m=>m.title)
    }else{
      return this.props.maps.filter(m=>m.public === true).map(m=>m.title)
    }

  }

  render(){
    return(
      <div className="user-filter">

        <form onChange={e=>this.handleChange(e)}>
            <input type="text" list="usersFilter" placeholder="Search for a map"></input>
            <datalist id="usersFilter">
             
              {this.renderMapOptions().map(m=><option key={m}>{m}</option>)}
            </datalist>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // filterMarkers: (username) => dispatch(filterMarkers(username)),
    // fetchAllUsers: () => dispatch(fetchAllUsers())
    filterMaps: (mapTitle) => dispatch(filterMaps(mapTitle))
  }
}


const mapStateToProps = (state) => {
  return {
      maps: state.maps.maps,
      currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapFilter)