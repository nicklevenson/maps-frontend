import React from 'react';
import mapboxgl from 'mapbox-gl'



class Map extends React.Component {
  componentDidMount() {
    mapboxgl.accessToken = process.env.REACT_APP_API_KEY;
    const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    center: [-77.0353, 38.8895], // starting position [lng, lat]
    zoom: 2 // starting zoom
    });
    var monument = [-77.0353, 38.8895];
    var popup = new mapboxgl.Popup({ offset: 25 }).setText(
      'Construction on the Washington Monument began in 1848.'
      );
       
      // create DOM element for the marker
      var el = document.createElement('div');
      el.id = 'marker';
      el.style.width = "50px"
      el.style.height = "50px"
      el.style.backgroundColor = "blue"
       
      // create the marker
      new mapboxgl.Marker(el)
      .setLngLat(monument)
      .setPopup(popup) // sets a popup on this marker
      .addTo(map);

  }
  
  render(){
    return(
      <div id="map" style={{width:"90vw", height:"70vh"}}></div>
    )
  }
}

export default Map