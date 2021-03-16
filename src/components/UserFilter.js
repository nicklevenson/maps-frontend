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
  
    this.props.filterMarkers(e.target.value)
    
  }
  renderUserOptions = () => {
    return this.props.allUsers.filter(u=>u.markers.length > 0).map(u=>u.username)
  }
  render(){
    return(
      <div class="user-filter">
        <h5 >Filter Markers by User </h5>

        <form onChange={e=>this.handleChange(e)}>
            <input list="usersFilter"></input>
            <datalist id="usersFilter">
              <option>All</option>
              {this.renderUserOptions().map(u=><option>{u}</option>)}
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
      allUsers: state.currentUser.allUsers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFilter)


