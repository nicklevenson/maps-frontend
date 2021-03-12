import React from 'react'
import Map from '../components/Map.js';
import {connect} from 'react-redux'
// import {addMarker} from './actions/addMarker.js'
class MapContainer extends React.Component{
 
  render(){
    return(
      <Map markers={this.props.markers}/>
    )
  }
  
}


const mapStateToProps = (state) => {
  return {
      markers: state.markers.markers
  }
}

export default connect(mapStateToProps)(MapContainer)