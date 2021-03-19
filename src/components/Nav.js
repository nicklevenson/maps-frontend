import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import { Menu, Image} from 'semantic-ui-react'
export default class Nav extends React.Component {

  state = { activeItem: 'home' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state
    return(
      <div className="ui middle aligned container nav">
        
        <Menu secondary compact>   
          {this.props.currentUser.image ? <Image circular src={this.props.currentUser.image} style={{height: "50px"}}/> : null }
         <Menu.Menu > 
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
     
      </div>
    )
  }
}

// export default Nav