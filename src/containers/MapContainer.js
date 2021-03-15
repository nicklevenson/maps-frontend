import React from 'react'
import Map from '../components/Map.js';

class MapContainer extends React.Component{
  state = {
    selectedMarker: {}
  }
  
  

  handleMarkerSelect = (marker) => {
    this.setState({selectedMarker: marker})
  }
 
  render(){
    return(
      <div className="outer-map-container">
        <h1 className="map-header">{this.props.heading}</h1>
        <Map markers={this.props.markers} handleMarkerSelect={this.handleMarkerSelect}/>
        <br/>
      </div>
    )
  }
}

export default MapContainer