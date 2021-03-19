import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'
export default class Nav extends React.Component {

  state = { activeItem: 'home' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    return(
      // <div className="navbar">
        <Menu>    
          <Menu.Item
            name='public-maps'
            active={activeItem === 'public-maps'}
            onClick={this.handleItemClick}
            as={NavLink}
            to="/public-maps"
          />
    
          <Menu.Item
            name='my-maps'
            active={activeItem === 'my-maps'}
            onClick={this.handleItemClick}
            as={NavLink}
            to="/my-maps"
          />
           {/* <NavLink to="/my-maps" >My Maps</NavLink> */}
          <Menu.Menu position='right'>
      
             {!sessionStorage.jwt ?
                <Menu.Item
                name='login'
                active={activeItem === 'login'}
                onClick={this.handleItemClick}
                as={NavLink}
                to="/login"
                />    
              : 
                <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                onClick={this.handleItemClick}
                as={NavLink}
                to="/logout"
                />   
              }
          </Menu.Menu>
  
        </Menu>
     
      // </div>
    )
  }
}

// export default Nav