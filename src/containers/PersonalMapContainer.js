import React from 'react'
import Map from '../components/Map.js';
import {connect} from 'react-redux'
// import {addMarker} from './actions/addMarker.js'
import MarkerInfo from '../components/MarkerInfo.js'
class PersonalMapContainer extends React.Component{
  state = {
    selectedMarker: {}
  }

  handleMarkerSelect = (marker) => {
    this.setState({selectedMarker: marker})
  }
 
  render(){
    return(
      <div className="my-map">
        <h1>My Map</h1>
        <Map markers={this.props.markers} handleMarkerSelect={this.handleMarkerSelect}/>
        <MarkerInfo marker={this.state.selectedMarker}/>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
      markers: state.markers.markers
  }
}

export default connect(mapStateToProps)(PersonalMapContainer)