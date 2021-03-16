import React from 'react'
import Map from '../components/Map.js';

class MapContainer extends React.Component{
  state = {
    selectedMarker: {},
    userOptions: [],
    selectedOption: "All",
    detectChange: ""
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

  handleUserOption = (e) => {
    this.setState({selectedOption: e.target.value})
    
  }

  handleMarkerSelect = (marker) => {
    this.setState({selectedMarker: marker})
  }

  filterMarkers = () => {
    if ( this.state.selectedOption === "All"){
      return this.props.markers
    }else{
      return this.props.markers.filter(m=>{return m.user.username === this.state.selectedOption})
    }
    
  }
 
  render(){
    return(
      <div className="outer-map-container">
        <h1 className="map-header">{this.props.heading}</h1>
        <Map markers={this.filterMarkers()} handleMarkerSelect={this.handleMarkerSelect}/>
        <form onChange={e=>this.handleUserOption(e)}>
          <select>
            <option>All</option>
            {this.state.userOptions.map(u=><option>{u}</option>)}
          </select>
        </form>
        <br/>
      </div>
    )
  }
}

export default MapContainer