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
    this.props.points.forEach(point => {
      var monument = [point.coordinates.lng,point.coordinates.lat];
      var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h2>${point.title}</h2>
        <p>${point.info}</p>`
      )
         
        // create DOM element for the marker
        var el = document.createElement('div');
        el.id = 'marker';
        new mapboxgl.Marker(el)
        .setLngLat(monument)
        .setPopup(popup) // sets a popup on this marker
        .addTo(map);
    })
    map.on('click', (e) => {
      var monument = [e.lngLat.lng, e.lngLat.lat]
      var el = document.createElement('div');
      el.id = 'marker';
      new mapboxgl.Marker(el)
      .setLngLat(monument)
      .addTo(map);
    })

  }
  
  render(){
    return(
      <div id="map" style={{width:"90vw", height:"70vh"}}></div>
    )
  }
}

export default Map