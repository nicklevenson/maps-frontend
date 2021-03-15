import React from 'react'
import {NavLink} from 'react-router-dom'

class Nav extends React.Component {
  render() {
    return(
      <div className="navbar">
        <NavLink to="/public-map">Public Map</NavLink>
        <NavLink to="/my-map">My Map</NavLink>
        {!sessionStorage.jwt ? <NavLink to="/login">Login</NavLink> : <NavLink to="/logout">Logout</NavLink>}
      </div>
    )
  }
}

export default Nav