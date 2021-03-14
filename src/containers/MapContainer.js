import React from 'react'
import Map from '../components/Map.js';
import {connect} from 'react-redux'  
import MarkerInfo from '../components/MarkerInfo.js'
import { fetchMarkers } from '../actions/addMarker.js';

class MapContainer extends React.Component{
  state = {
    selectedMarker: {}
  }
  
  componentDidMount() {
    this.props.fetchMarkers()
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
        <div id="marker-info-container">
          {this.state.selectedMarker.title ? <MarkerInfo marker={this.state.selectedMarker} handleMarkerSelect={this.handleMarkerSelect}/> : null}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMarkers: () => dispatch(fetchMarkers())
  }
}


const mapStateToProps = (state) => {
  return {
      markers: state.markers.markers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapContainer)