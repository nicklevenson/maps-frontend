import React from 'react'
import {connect} from 'react-redux'
import Map from '../components/Map.js';
import NewMarkerContainer from './NewMarkerContainer.js'
import NewMapContainer from './NewMapContainer.js'
import MapFilter from '../components/MapFilter'
class MapContainer extends React.Component{
  state = {
    selectedMarker: {},
    editMapForm: false
    // filteredMarkers: []
  }
  componentDidMount() {
    // this.filterMarkers("All")
  }
 

  handleUserOption = (e) => {
    this.filterMarkers(e.target.value)
  }

  handleMarkerSelect = (marker) => {
    this.setState({selectedMarker: marker})
  }

  filterMarkers = (value) => {
    let filteredMarks;
    if ( value === "All"){
      filteredMarks = this.props.markers
      this.setState({filteredMarkers: filteredMarks})
    }else{
      filteredMarks = this.props.markers.filter(m=>m.user.username === value)
      this.setState({filteredMarkers: filteredMarks})
    }

  }
  isUserMapEditable = () => {
    if (this.props.map.users) {
      if(this.props.map.users[0].id === this.props.currentUser.id){
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
      <div className="outer-map-container">
        <h2 className="map-header">{this.props.heading}</h2>
        {this.props.map.users ? 
          <div className="map-title">
            <h2>{this.props.map.title} by {this.props.map.users.map(u=>u.username)}</h2>
            <i>{this.props.map.description}</i>
            {
            this.isUserMapEditable() ? 
              <div className="edit-map">
                <br></br>
                <div onClick={this.triggerEditForm} className="X"><h6 style={{margin: "0"}}>Edit</h6></div>
              </div>  
              : 
              null
            }
          </div> 
          : null}
          <Map markers={this.props.map.markers} mapTitle={this.props.map.title} handleMarkerSelect={this.handleMarkerSelect}/>
          <NewMapContainer editMapForm={this.state.editMapForm} removeEditForm={this.removeEditForm}/>
          <MapFilter/>
        <br/>
        
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser.currentUser,
      selectedMap: state.maps.selectedMap
  }
}





export default connect(mapStateToProps)(MapContainer)