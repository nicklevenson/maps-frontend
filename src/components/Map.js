import React from 'react';
import mapboxgl from 'mapbox-gl'
import MarkerForm from './MarkerForm.js'

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
          <div class="newMarkerContainer">
            {this.state.newMarkerInfo ? <div onClick={this.removeForm}>X</div> : null}
            <h5>New Marker</h5>
            <div id="newMarker" className="marker"></div>
          </div>
          {this.state.newMarkerInfo ? <MarkerForm removeForm={this.removeForm} newMarkerInfo={this.state.newMarkerInfo}/> : null}
        </div>
      </>
    )
  }

  removeForm = () => {
    document.getElementById("temp-marker").remove()
    this.setState({newMarkerInfo: null})
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
    console.log(this.state.map)
    this.props.markers.forEach(marker => {
      var coords = [marker.coordinates.lng,marker.coordinates.lat];
      // var popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
      //   `<h2>${marker.title}</h2>
      //   <p>${marker.info}</p>`
      // )
    // create DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        new mapboxgl.Marker(el)
        .setLngLat(coords)
        // .setPopup(popup) // sets a popup on this marker
        .addTo(this.state.map);

        let markerEvent = (marker, handleMarkerSelect) => {
          el.addEventListener("click", function renderInfo() {
            handleMarkerSelect(marker)
          })
        }
        markerEvent(marker, this.props.handleMarkerSelect) 
    })
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