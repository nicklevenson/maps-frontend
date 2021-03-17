import React from 'react'
import {createMarker} from '../actions/MarkerActions.js'
import {connect} from 'react-redux'


class MarkerForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()

      let marker = this.props.newMarkerInfo
      marker.title = e.target.title.value
      marker.info = e.target.info.value
      marker.user_id = this.props.currentUser.id
      
      this.props.createMarker(marker)
      this.props.removeForm()
      document.getElementById("newMarkerContainer").style.display = "inline-block"
  }
  
   render() {
    document.getElementById("newMarkerContainer").style.display = "none"
    
    return (
      <div id="newMarkerForm">

        <h3>New Marker</h3>
        <form onSubmit={e=>this.handleSubmit(e)}>
          <label>Marker Title</label><br/>
          <input type="text" name="title" required={true}></input><br/>
          <label>Marker Info</label><br/>
          <textarea name="info" required={true}></textarea><br/>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createMarker: (marker) => dispatch(createMarker(marker))
  }
}


const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser.currentUser
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MarkerForm)