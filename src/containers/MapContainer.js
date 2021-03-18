import React from 'react'

import Map from '../components/Map.js';
import NewMarkerContainer from './NewMarkerContainer.js'

class MapContainer extends React.Component{
  state = {
    selectedMarker: {},
    // filteredMarkers: []
  }
  componentDidMount() {
    // this.filterMarkers("All")
  }
 

  handleUserOption = (e) => {
    this.filterMarkers(e.target.value)
  }

  handleMarkerSelect = (marker) => {
    this.setState({selectedMarker: marker})
  }

  filterMarkers = (value) => {
    let filteredMarks;
    if ( value === "All"){
      filteredMarks = this.props.markers
      this.setState({filteredMarkers: filteredMarks})
    }else{
      filteredMarks = this.props.markers.filter(m=>m.user.username === value)
      this.setState({filteredMarkers: filteredMarks})
    }

  }
 
  render(){
    return(
      <div className="outer-map-container">
        <h2 className="map-header">{this.props.heading}</h2>
        {this.props.map.users ? 
          <div className="map-title">
            <h2>{this.props.map.title} by {this.props.map.users.map(u=>u.username)}</h2>
            <i>{this.props.map.description}</i>
          </div> 
          : null}
          <Map markers={this.props.map.markers} mapTitle={this.props.map.title} handleMarkerSelect={this.handleMarkerSelect}/>
        
        <br/>
        
      </div>
    )
  }
}

export default MapContainer