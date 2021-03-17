import React from 'react'
import {connect} from 'react-redux'
import {filterMarkers} from '../actions/MarkerActions.js'
import { fetchAllUsers } from '../actions/UserActions.js'
class UserFilter extends React.Component {
  
  componentDidMount() {
    this.props.fetchAllUsers()
    this.renderUserOptions()
    this.props.filterMarkers("All")
  }
  

  handleChange = (e) => {
    if (e.target.value === ""){
      this.props.filterMarkers("All")
    }else{
      this.props.filterMarkers(e.target.value)
    }  
  }
  renderUserOptions = () => {
    if (window.location.pathname === "/my-map"){
      return this.props.allUsers.filter(u=> this.props.currentUser.likedMarkers.map(m=>m.user_id).includes(u.id)).map(u=>u.username)
    }else{
      return this.props.allUsers.filter(u=>u.markers.length > 0).map(u=>u.username)
    }
 
  }
  render(){
    return(
      <div className="user-filter">
        <h5 >Filter Markers by User </h5>

        <form onChange={e=>this.handleChange(e)}>
            <input list="usersFilter"></input>
            <datalist id="usersFilter">
              <option>All</option>
              {this.renderUserOptions().map(u=><option key={u}>{u}</option>)}
            </datalist>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterMarkers: (username) => dispatch(filterMarkers(username)),
    fetchAllUsers: () => dispatch(fetchAllUsers())
  }
}


const mapStateToProps = (state) => {
  return {
      markers: state.markers.markers,
      allUsers: state.currentUser.allUsers,
      currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFilter)


