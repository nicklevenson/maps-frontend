import React from 'react';
import mapboxgl from 'mapbox-gl'
import {connect} from 'react-redux'
import MarkerForm from '../components/MarkerForm.js'

import RenderMarker from '../components/RenderMarker.js'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import {destroyMarker, addMarkerToUserMap, removeMarkerFromUserMap} from '../actions/MarkerActions.js'
import NewMarkerContainerMobile from './NewMarkerContainerMobile.js'
import Login from '../components/Login.js'
import MapFilterMobile from '../components/MapFilterMobile.js';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import NewMapContainerMobile from './NewMapContainerMobile.js';
import { addMarkerToMap } from '../actions/MapActions.js';
import { Image} from 'semantic-ui-react'
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
class MapContainerMobile extends React.Component {
  state = {
    map: "",
    newMarkerInfo: null,
    editMapForm: false,
    redirect: false,
 
  }

  componentDidMount() {
    this.renderMap()
  }

  componentDidUpdate() {
    this.renderMarkers()
  }

  isUserMap = () => {
    if (this.props.selectedMap.users) {
      if(this.props.selectedMap.users.map(u => u.id).includes(this.props.currentUser.id)){
        return true
      }else{
        return false
      }
    }else{
      return false
    }
  }
  isUserMapEditable = () => {
    if (this.props.selectedMap.users) {
      if(this.props.selectedMap.users[0].id === this.props.currentUser.id){
        return true
      }else{
        return false
      }
    }else{
      return false
    }
  }

  triggerEditForm = () => {
    this.setState({editMapForm: true})
  }

  removeEditForm = () => {
    this.setState({editMapForm: false})
  }
  
  render(){
      return(
        <>
        <div className="outer-map-container-mobile">
          <div className="map-container-mobile">
            <div id="map"></div>
          </div>
          {this.props.selectedMap.users ? 
          <div className="map-title">
            <h3>{this.props.selectedMap.title}</h3> 
            {this.props.selectedMap.users.map(u => <Image className="very-tiny" circular src={u.image}></Image>)}<br/>
            <textarea readOnly value={this.props.selectedMap.description}></textarea>
            {
            this.isUserMapEditable() ? 
              <div className="edit-map">
                <div onClick={this.triggerEditForm} className="X"><h6 style={{margin: "0"}}>Edit</h6></div>
              </div>  
              : 
              null
            }
          </div> 
          : 
          <div className="map-title">
            <h3>Search for Maps or Make One!</h3>
          </div>}
          
          {this.isUserMap() ? <NewMarkerContainerMobile map={this.state.map}/> : null}
          <NewMapContainerMobile editMapForm={this.state.editMapForm} removeEditForm={this.removeEditForm}/>
          <MapFilterMobile/>
        </div> 
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
    document.querySelectorAll(".mapboxgl-ctrl-geocoder--input")[0].placeholder = "Search for Places"
    document.querySelectorAll(".mapboxgl-ctrl-geocoder--input")[0].style = "height: 30px !important;"
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
    
    this.props.selectedMap.markers.forEach(marker => RenderMarker({
      marker: marker, map: this.state.map, 
      handleMarkerSelect: this.props.handleMarkerSelect, 
      destroyMarker: this.props.destroyMarker, 
      currentUser: this.props.currentUser,
      selectedMap: this.props.selectedMap,
      handleRemoveMarker: this.handleRemoveMarker,
      handleMarkerAdd: this.handleMarkerAdd
    }))
  }

  handleRemoveMarker = (marker) => {
    this.props.removeMarkerFromUserMap(marker, this.props.selectedMap.id)
  }

  handleMarkerAdd = (e, marker_id) =>{
    e.preventDefault()
    const map_id = this.props.currentUser.maps.find(m=>m.title === e.target.mapTitle.value).id
    // console.log(map_id)
    this.props.addMarkerToUserMap(marker_id, map_id)
    document.getElementById("add-marker-to-map-container").remove()
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    destroyMarker: (marker) => dispatch(destroyMarker(marker)),
    addMarkerToUserMap: (marker_id, map_id) => dispatch(addMarkerToUserMap(marker_id, map_id)),
    removeMarkerFromUserMap: (marker, map_id) => dispatch(removeMarkerFromUserMap(marker, map_id))
  }
} 

const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser.currentUser,
      selectedMap: state.maps.selectedMap
  }
}





export default connect(mapStateToProps, mapDispatchToProps)(MapContainerMobile)