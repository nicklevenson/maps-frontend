import React from 'react';
import mapboxgl from 'mapbox-gl'



class Map extends React.Component {
  componentDidMount() {
    mapboxgl.accessToken = process.env.REACT_APP_API_KEY;
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [-74.5, 40], // starting position [lng, lat]
    zoom: 9 // starting zoom
    });
  }
  render(){
    return(
      <div id="map" style={{width:"50vw", height:"50vh"}}></div>
    )
  }
}

export default Map