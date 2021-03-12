import React from 'react'
import Map from '../components/Map.js';

class MapContainer extends React.Component{
  state = {
    points: [
      {
        title: "Test",
        coordinates: {
        lat: 45.512230,
        lng: -122.658722
        },
        info: "I like this place"
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