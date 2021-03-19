import React from 'react'
import {connect} from 'react-redux'
import {filterMaps, fetchMaps} from '../actions/MapActions.js'

class MapFilter extends React.Component {
  
  componentDidMount() {
    // this.props.fetchAllUsers()
    // this.renderUserOptions()
    // this.props.filterMaps("")
    this.props.fetchMaps()
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
    if (window.location.pathname === "/my-maps"){
      return this.props.currentUser.maps.map(m=>m)
    }else{
      // if (this.props.currentUser.username) {
      //   return this.props.maps.filter(m=>m.public === true || this.props.currentUser.maps.map(m=>m.id).includes(m.id)).map(m=>m.title)
      // }else{
        return this.props.maps.filter(m=>m.public === true).map(m=>m)
      // }
      
    }

  }

  render(){
    return(
      <div className="user-filter">

        <form onChange={e=>this.handleChange(e)} onSelect={e=>this.handleChange(e)}>
            <input type="text" list="usersFilter" placeholder="Search for a Map"></input>
            <input type="reset" id="reset" value="X" onClick={e => this.handleChange(e)}></input>
            <datalist id="usersFilter">
              {this.renderMapOptions().map(m=><option key={m.id}>{m.title}</option>)}
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
    filterMaps: (mapTitle) => dispatch(filterMaps(mapTitle)),
    fetchMaps: () => dispatch(fetchMaps())
  }
}


const mapStateToProps = (state) => {
  return {
      maps: state.maps.maps,
      currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapFilter)