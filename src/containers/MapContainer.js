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
        <h2 className="map-title">{this.props.map.title}</h2>
          <Map markers={this.props.map.markers} mapTitle={this.props.map.title} handleMarkerSelect={this.handleMarkerSelect}/>
        
        <br/>
        
      </div>
    )
  }
}

export default MapContainer