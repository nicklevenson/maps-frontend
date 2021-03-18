import React from 'react'
import {NavLink} from 'react-router-dom'

class Nav extends React.Component {
  render() {
    return(
      <div className="navbar">
        <NavLink to="/public-maps">Public Maps</NavLink>
        <NavLink to="/my-maps">My Maps</NavLink>
        {!sessionStorage.jwt ? <NavLink to="/login">Login</NavLink> : <NavLink to="/logout">Logout</NavLink>}
      </div>
    )
  }
}

export default Nav