import React from 'react'


export default class UserFilter extends React.Component {
  state = {
    userOptions: []
  }

  componentDidUpdate() {
    this.renderUserOptions()
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.markers !== this.props.markers) {
      return true
    }else{
      return false
    }
  }

  renderUserOptions = () => {
    const users = this.props.markers.map(m=>m.user.username)
    const uniqueUsers = new Set()
    users.forEach(u=>uniqueUsers.add(u))
    const array = Array.from(uniqueUsers)
    this.setState({userOptions: array})
  }
  render(){
    return(
      <form onChange={e=>this.props.handleUserOption(e)}>
          <select>
            <option>All</option>
            {this.state.userOptions.map(u=><option>{u}</option>)}
          </select>
      </form>
    )
  }
}
