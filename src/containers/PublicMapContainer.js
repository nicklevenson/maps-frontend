import React from 'react'
import Map from '../components/Map.js';
import {connect} from 'react-redux'
// import {addMarker} from './actions/addMarker.js'
class PublicMapContainer extends React.Component{
  
 
  render(){
    return(
      <div className="public-map">
        <h1>Pubic Map</h1>
        <Map markers={this.props.markers}/>
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