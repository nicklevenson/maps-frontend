import React from 'react'
import Map from '../components/Map.js';
import {connect} from 'react-redux'
import MarkerInfo from '../components/MarkerInfo.js'
// import {addMarker} from './actions/addMarker.js'
class PublicMapContainer extends React.Component{
  state = {
    selectedMarker: {}
  }

  handleMarkerSelect = (marker) => {
    this.setState({selectedMarker: marker})
  }
 
  render(){
    return(
      <div className="outer-map-container">
        <h1 className="map-header">Public Map</h1>
        <Map markers={this.props.markers} handleMarkerSelect={this.handleMarkerSelect}/>
        <br/>
        <div id="marker-info-container">
          {this.state.selectedMarker.title ? <MarkerInfo marker={this.state.selectedMarker} handleMarkerSelect={this.handleMarkerSelect}/> : null}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      markers: state.markers.markers
  }
}

export default connect(mapStateToProps)(PublicMapContainer)