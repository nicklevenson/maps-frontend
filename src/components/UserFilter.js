import React from 'react'
import {connect} from 'react-redux'
import {filterMarkers} from '../actions/MarkerActions.js'
class UserFilter extends React.Component {
  state = {
    userOptions: []
  }

  componentDidMount() {
    this.renderUserOptions()
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
    const users = this.props.markers.map(m=>m.user.username)
    const uniqueUsers = new Set()
    users.forEach(u=>uniqueUsers.add(u))
    const array = Array.from(uniqueUsers)
    return array
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
    filterMarkers: (username) => dispatch(filterMarkers(username))
  }
}


const mapStateToProps = (state) => {
  return {
      markers: state.markers.markers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserFilter)


