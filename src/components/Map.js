import React from 'react';
import mapboxgl from 'mapbox-gl'

import {connect} from 'react-redux'
import {addMarker} from '../actions/addMarker.js'

class Map extends React.Component {
  state = {
    map: ""
  }

  componentDidMount() {
    this.renderMap()
  }

  componentDidUpdate() {
    this.renderMarkers()
  }
  
  render(){
    return(
      <div>
        <div id="map" style={{width:"90vw", height:"70vh"}}></div>
        <div id="newMarker" className="marker">New Marker</div>
      </div>
    )
  }


  renderMap() {
    mapboxgl.accessToken = process.env.REACT_APP_API_KEY;
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/mapbox/light-v10', // style URL
      center: [-77.0353, 38.8895], // starting position [lng, lat]
      zoom: 2 // starting zoom
    });
    this.setState({map: map})

    const newMarkerButton = document.getElementById("newMarker")
    const addMarker = this.props.addMarker
    newMarkerButton.addEventListener('click', (e) => {
      map.on('click', function mapEvent(e){
       
          const coords = [e.lngLat.lng, e.lngLat.lat]
          const marker = {
            title: "I made it!",
            coordinates: {
              lat: coords[1],
              lng: coords[0]
            },
            info: "Woo!"
          }
          addMarker(marker)
          map.off('click', mapEvent)
          //trigger a form, disable click
          //create instance of a new point in state
        
      })
    }
   )
}

  renderMarkers(){
    this.props.markers.forEach(marker => {
      var coords = [marker.coordinates.lng,marker.coordinates.lat];
      var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
        `<h2>${marker.title}</h2>
        <p>${marker.info}</p>`
      )
    // create DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        new mapboxgl.Marker(el)
        .setLngLat(coords)
        .setPopup(popup) // sets a popup on this marker
        .addTo(this.state.map);

        let markerEvent = (marker, handleMarkerSelect) => {
          el.addEventListener("click", function renderInfo() {
            console.log(handleMarkerSelect(marker))
          })
        }
        markerEvent(marker, this.props.handleMarkerSelect)
        
       
    })
  }  


}



const mapDispatchToProps = (dispatch) => {
  return {
    addMarker: (marker) => dispatch(addMarker(marker))
  }
}

export default connect(null, mapDispatchToProps)(Map)