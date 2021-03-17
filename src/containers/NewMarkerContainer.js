import React from 'react'
import MarkerForm from '../components/MarkerForm.js'
import {connect} from 'react-redux'
import mapboxgl from 'mapbox-gl'
class NewMarkerContainer extends React.Component {
  state = {
    map: "",
    newMarkerInfo: null,
    redirect: false
  }

  componentDidMount() {
    this.renderNewMarkerForm()
  } 


  render(){
    return(
      <div className="side-bar">
        {this.state.newMarkerInfo ? <MarkerForm removeForm={this.removeForm} newMarkerInfo={this.state.newMarkerInfo}/> : null}
        <div id="newMarkerContainer">
          <h5 style={{margin:"0"}}>New Marker</h5>
          <div id="newMarker" className="marker" style={{backgroundImage:`url(${this.props.currentUser.image})`}}></div>
        </div>
      </div>

    )
  }
  
  renderNewMarkerContainer = () => {
    <div id="newMarkerContainer">
      <h5 style={{margin:"0"}}>New Marker</h5>
      {this.props.currentUser ? <div id="newMarker" className="marker" style={{backgroundImage:`url(${this.props.currentUser.image})`}}></div> : null}
    </div>
  }

  

  renderNewMarkerForm = () => {
    const map = this.props.mapbox
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
          this.setState({redirect: true})
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
    .addTo(this.props.mapbox);
  }
 

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
      currentUser: state.currentUser.currentUser,
      mapbox: state.maps.mapbox
  }
}





export default connect(mapStateToProps)(NewMarkerContainer)