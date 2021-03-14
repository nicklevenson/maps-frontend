import React from 'react';
import mapboxgl from 'mapbox-gl'

import MarkerForm from './MarkerForm.js'
import RenderMarker from './RenderMarker.js'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

class Map extends React.Component {
  state = {
    map: "",
    newMarkerInfo: null
  }

  componentDidMount() {
    this.renderMap()
  }

  componentDidUpdate() {
    this.renderMarkers()
  }
  
  render(){
    return(
      <>
        <div className="map-container">
          <div id="map"></div>
        </div>
        <div className="side-bar">
        {this.state.newMarkerInfo ? <div onClick={this.removeForm}>X</div> : null}
          <div id="newMarkerContainer">
            
            <h5 style={{margin:"0"}}>New Marker</h5>
            <div id="newMarker" className="marker"></div>
          </div>
          {this.state.newMarkerInfo ? <MarkerForm removeForm={this.removeForm} newMarkerInfo={this.state.newMarkerInfo}/> : null}
        </div>
      </>
    )
  }

  removeForm = () => {
    this.setState({newMarkerInfo: null})
    document.getElementById("newMarkerContainer").style.display = "inline-block"
    document.getElementById("temp-marker").remove()
  }

  renderMap() {
    mapboxgl.accessToken = process.env.REACT_APP_API_KEY;
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/nicklevenson/ckm82ay4haed317r1gmlt32as', // style URL
      center: [-77.0353, 38.8895], // starting position [lng, lat]
      zoom: 2 // starting zoom
    });
    map.addControl(
      new MapboxGeocoder({
      accessToken: process.env.REACT_APP_API_KEY,
      mapboxgl: mapboxgl
      })
    );
    this.setState({map: map})
    const newMarkerButton = document.getElementById("newMarkerContainer")
    newMarkerButton.addEventListener('click', (e) => {
      const triggerState = (newMarkerInfo) => this.setState({newMarkerInfo: newMarkerInfo})
      const renderTempMarker = (marker) => this.renderTempMarker(marker)
        map.on('click', function mapEvent(e){
            const coords = [e.lngLat.lng, e.lngLat.lat]
            const marker = {
              title: "New Marker",
              coordinates: {
                lat: coords[1],
                lng: coords[0]
              },
              info: "Be sure to submit me"
            }
            // addMarker(marker)
            triggerState(marker)
            renderTempMarker(marker)
            map.off('click', mapEvent)
            //trigger a form, disable click
            //create instance of a new point in state
          
        })
    }
   )
}

  renderMarkers(){
    this.props.markers.forEach(marker => RenderMarker({marker: marker, map: this.state.map, handleMarkerSelect: this.props.handleMarkerSelect}))
  }  

  renderTempMarker(marker) {
    var coords = [marker.coordinates.lng,marker.coordinates.lat];
    var temp = document.createElement('div');
    temp.className = 'marker';
    temp.id = 'temp-marker'
    new mapboxgl.Marker(temp)
    .setLngLat(coords)
    .addTo(this.state.map);
  }

}



export default Map