import React from 'react'
import {addMarker} from '../actions/addMarker.js'
import {connect} from 'react-redux'

class MarkerForm extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault()
    let marker = this.props.newMarkerInfo
    marker.title = e.target.title.value
    marker.info = e.target.info.value
    this.props.addMarker(marker)
    this.props.removeForm()
  }
   render() {
    return (
      <div id="newMarkerForm">
        <h3>New Marker</h3>
        <form onSubmit={e=>this.handleSubmit(e)}>
          <label>Marker Title</label><br/>
          <input type="text" name="title"></input><br/>
          <label>Marker Info</label><br/>
          <textarea name="info"></textarea><br/>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    addMarker: (marker) => dispatch(addMarker(marker))
  }
}

export default connect(null, mapDispatchToProps)(MarkerForm)