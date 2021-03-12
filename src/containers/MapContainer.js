import React from 'react'
import Map from '../components/Map.js';

class MapContainer extends React.Component{
  state = {
    points: [
      {
        title: "Test",
        coordinates: {
        lat: -77.03238901390978,
        lng: 38.913188059745586
        }
      }
    ]
  }
  render(){
    return(
      <Map points={this.state.points}/>
    )
  }
}

export default MapContainer