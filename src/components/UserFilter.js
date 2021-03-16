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

  // componentDidUpdate() {
  //   this.renderUserOptions()
  // }

  // shouldComponentUpdate(nextProps) {
  //   if (nextProps.markers !== this.props.markers) {
  //     return true
  //   }else{
  //     return false
  //   }
  // }
  handleChange = (e) => {
    this.props.filterMarkers(e.target.value)
  }
  renderUserOptions = () => {
    return this.props.allUsers.map(u=>u.username)
  }
  render(){
    return(
      <form onChange={e=>this.handleChange(e)}>
          <select>
            <option>All</option>
            {this.renderUserOptions().map(u=><option>{u}</option>)}
          </select>
      </form>
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


