import React from 'react'
import MarkerForm from '../components/MarkerForm.js'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'
import Login from '../components/Login.js'
class NewMarkerContainerMobile extends React.Component {
  state = {
    newMarkerInfo: null,
    redirect: false
  }
  componentDidMount() {
    if (this.props.map) {
      this.renderNewMarkerForm()
    }
  }
  componentDidUpdate() {
    if (this.props.map) {
      this.renderNewMarkerForm()
    }
  } 


  render(){
    if (this.state.redirect) {
      return(
        <Login heading={'Please login to use this feature'}/>
      )
    
    }else {
      return(
        <div className="side-bar">
          {this.state.newMarkerInfo ? <div onClick={this.removeForm} className="X">X</div> : null}
          {this.state.newMarkerInfo ? <MarkerForm removeForm={this.removeForm} newMarkerInfo={this.state.newMarkerInfo}/> : null}
          <div id="newMarkerContainer">
            <h5 style={{margin:"0"}}>New Marker</h5>
            <div id="newMarker" className="marker" style={{backgroundImage:`url(${this.props.currentUser.image})`}}></div>
          </div>
        </div>
      )
    }
  }

  removeForm = () => {
    this.setState({newMarkerInfo: null})
    document.getElementById("newMarkerContainer").style.display = "inline-block"
    document.getElementById("temp-marker").remove()
  }
  
  renderNewMarkerContainer = () => {
    <div id="newMarkerContainer">
      <h5 style={{margin:"0"}}>New Marker</h5>
      {this.props.currentUser ? <div id="newMarker" className="marker" style={{backgroundImage:`url(${this.props.currentUser.image})`}}></div> : null}
    </div>
  }

  

  renderNewMarkerForm = () => {
    const map = this.props.map
    if (document.getElementById("newMarkerContainer")) {
      const newMarkerButton = document.getElementById("newMarkerContainer")
    
      newMarkerButton.addEventListener('mousedown', (e) => {
        
        if (this.props.currentUser.username) {
          const triggerState = (newMarkerInfo) => this.setState({newMarkerInfo: newMarkerInfo})
          const renderTempMarker = (marker) => this.renderTempMarker(marker)
          function handleMouseMove(e) {
            if (document.getElementById("temp-marker")){
              document.getElementById("temp-marker").remove()
            }
            const coords = [e.lngLat.lng, e.lngLat.lat]
         
            const marker = {
              title: "New Marker",
              lat: coords[1],
              lng: coords[0],
              info: "Be sure to submit me"
            }
            renderTempMarker(marker)
          }
            map.on('mousemove', handleMouseMove)        
            map.on('mouseup', function mapEvent(e){
              map.off('mousemove', handleMouseMove)
                document.getElementById("temp-marker").remove()
                const coords = [e.lngLat.lng, e.lngLat.lat]
                const marker = {
                  title: "New Marker",
                  lat: coords[1],
                  lng: coords[0],
                  info: "Be sure to submit me"
                }
             
                triggerState(marker)
                renderTempMarker(marker)
                map.off('mouseup',  mapEvent)
                   
          })
        }else{
          document.getElementById("newMarkerContainer").innerHTML = "Please Login"
        }
      })
    }
    
  }

  renderTempMarker = (marker) =>{
    var coords = [marker.lng, marker.lat];
    var temp = document.createElement('div');
    temp.className = 'marker';
    temp.id = 'temp-marker'
    temp.style.backgroundImage = `url(${this.props.currentUser.image})`
    new mapboxgl.Marker(temp)
    .setLngLat(coords)
    .addTo(this.props.map);
  }
}

const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser.currentUser,
  }
}





export default connect(mapStateToProps)(NewMarkerContainerMobile)