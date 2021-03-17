import React from 'react';
import mapboxgl from 'mapbox-gl'
import {connect} from 'react-redux'
import MarkerForm from './MarkerForm.js'
import RenderMarker from './RenderMarker.js'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {destroyMarker, likeMarker, unlikeMarker} from '../actions/MarkerActions.js'
import NewMarkerContainer from '../containers/NewMarkerContainer.js'
import Login from './Login.js'
import MapFilter from './MapFilter.js';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

class Map extends React.Component {
  state = {
    map: "",
    newMarkerInfo: null,
    redirect: false
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
          <NewMarkerContainer map={this.state.map}/>
          <MapFilter/>
        </>
      )
  }

  

  removeMap = () =>{
    this.state.map.remove()
  }

  renderMap() {
    mapboxgl.accessToken = process.env.REACT_APP_API_KEY;
    const map = new mapboxgl.Map({
      container: 'map', // container ID
      style: 'mapbox://styles/nicklevenson/ckm82ay4haed317r1gmlt32as', // style URL
      center: [-77.0353, 38.8895], // starting position [lng, lat]
      zoom: 1 // starting zoom
    });
    map.addControl(
      new MapboxGeocoder({
      accessToken: process.env.REACT_APP_API_KEY,
      mapboxgl: mapboxgl
      })
    );
    this.setState({map: map})
   
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(function(position) {
    //     document.getElementById("map-container").innerHTML += <h1>{position}</h1>
    //   });
    // } 
    // this.renderNewMarkerForm(map)
    
  } 

  renderMarkers(){
    if (document.querySelectorAll('.mapboxgl-marker').length > 0) {
      document.querySelectorAll('.mapboxgl-marker').forEach(m=>m.remove())
    }
    if (document.querySelectorAll('.mapboxgl-popup').length > 0) {
      document.querySelectorAll('.mapboxgl-popup').forEach(m=>m.remove())
    }
    
    this.props.markers.forEach(marker => RenderMarker({
      marker: marker, map: this.state.map, 
      handleMarkerSelect: this.props.handleMarkerSelect, 
      destroyMarker: this.props.destroyMarker, 
      currentUser: this.props.currentUser,
      likeMarker: this.props.likeMarker,
      unlikeMarker: this.props.unlikeMarker
    }))
  }

  // renderNewMarkerContainer = () => {
  //   <div id="newMarkerContainer">
  //     <h5 style={{margin:"0"}}>New Marker</h5>
  //     {this.props.currentUser ? <div id="newMarker" className="marker" style={{backgroundImage:`url(${this.props.currentUser.image})`}}></div> : null}
  //   </div>
  // }

  

//   renderNewMarkerForm = (map) => {
//     if (document.getElementById("newMarkerContainer")) {
//       const newMarkerButton = document.getElementById("newMarkerContainer")
    
//       newMarkerButton.addEventListener('mousedown', (e) => {
        
//         if (this.props.currentUser.username) {
//           const triggerState = (newMarkerInfo) => this.setState({newMarkerInfo: newMarkerInfo})
//           const renderTempMarker = (marker) => this.renderTempMarker(marker)
//           function handleMouseMove(e) {
//             if (document.getElementById("temp-marker")){
//               document.getElementById("temp-marker").remove()
//             }
//             const coords = [e.lngLat.lng, e.lngLat.lat]
         
//             const marker = {
//               title: "New Marker",
//               lat: coords[1],
//               lng: coords[0],
//               info: "Be sure to submit me"
//             }
//             renderTempMarker(marker)
//           }
//             map.on('mousemove', handleMouseMove)        
//             map.on('mouseup', function mapEvent(e){
//                 map.off('mousemove', handleMouseMove)
//                 document.getElementById("temp-marker").remove()
//                 const coords = [e.lngLat.lng, e.lngLat.lat]
//                 const marker = {
//                   title: "New Marker",
//                   lat: coords[1],
//                   lng: coords[0],
//                   info: "Be sure to submit me"
//                 }
             
//                 triggerState(marker)
//                 renderTempMarker(marker)
//                 map.off('mouseup',  mapEvent)
                   
//           })
//         }else{
//           this.setState({redirect: true})
//         }
//       })
//     }
    
//   }


//   renderTempMarker(marker) {
//     var coords = [marker.lng, marker.lat];
//     var temp = document.createElement('div');
//     temp.className = 'marker';
//     temp.id = 'temp-marker'
//     temp.style.backgroundImage = `url(${this.props.currentUser.image})`
//     new mapboxgl.Marker(temp)
//     .setLngLat(coords)
//     .addTo(this.state.map);
//   }

}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     destroyMarker: (marker) => dispatch(destroyMarker(marker)),
//     likeMarker: (marker, currentUserId) => dispatch(likeMarker(marker, currentUserId)),
//     unlikeMarker: (marker, currentUserId) => dispatch(unlikeMarker(marker, currentUserId))
//   }
// } 

const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser.currentUser
  }
}





export default connect(mapStateToProps)(Map)