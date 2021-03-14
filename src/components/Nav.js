import React from 'react'
import {NavLink} from 'react-router-dom'

class Nav extends React.Component {
  render() {
    return(
      <div className="navbar">
        <NavLink to="/public-map">Public Map</NavLink>
        <NavLink to="/my-map">My Map</NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    )
  }
}

export default Nav