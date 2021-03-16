import React from 'react'

import UserFilter from '../components/UserFilter.js';
import Map from '../components/Map.js';

class MapContainer extends React.Component{
  state = {
    selectedMarker: {},
    filteredMarkers: []
  }
  componentDidMount() {
    this.filterMarkers("All")
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
        <h1 className="map-header">{this.props.heading}</h1>
        <Map markers={this.props.markers} handleMarkerSelect={this.handleMarkerSelect}/>
        {/* <UserFilter markers={this.props.markers} handleUserOption={this.handleUserOption}/> */}
        <br/>
      </div>
    )
  }
}

export default MapContainer