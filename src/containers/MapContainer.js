import React from 'react'
import Map from '../components/Map.js';

class MapContainer extends React.Component{
  state = {
    selectedMarker: {},
    userOptions: []
  }

  componentDidMount() {
    this.renderUserOptions()
  }
  
  renderUserOptions = () => {

    const users = this.props.markers.map(m=>m.user.username)
    const uniqueUsers = new Set()
    users.forEach(u=>uniqueUsers.add(u))
    const array = Array.from(uniqueUsers)
    this.setState({userOptions: array})
  }

  handleMarkerSelect = (marker) => {
    this.setState({selectedMarker: marker})
  }
 
  render(){
    return(
      <div className="outer-map-container">
        <h1 className="map-header">{this.props.heading}</h1>
        <Map markers={this.props.markers} handleMarkerSelect={this.handleMarkerSelect}/>
        <form>
          <select>
            {this.state.userOptions.map(u=><option>{u}</option>)}
          </select>
        </form>
        <br/>
      </div>
    )
  }
}

export default MapContainer