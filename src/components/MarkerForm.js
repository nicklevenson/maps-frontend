import React from 'react'
import {createMarker} from '../actions/MarkerActions.js'
import {connect} from 'react-redux'
import { Form, Button } from 'semantic-ui-react'

class MarkerForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()

      let marker = this.props.newMarkerInfo
      marker.title = e.target.title.value
      marker.info = e.target.info.value
      marker.image = e.target.image.value
      marker.user_id = this.props.currentUser.id
      marker.map_id = this.props.selectedMap.id

      this.props.createMarker(marker, this.props.selectedMap.title)
      this.props.removeForm()
      document.getElementById("newMarkerContainer").style.display = "inline-block"
      
  }
  
   render() {
    document.getElementById("newMarkerContainer").style.display = "none"
    
    return (
      <div id="newMarkerForm">
        
        <h3>New Marker</h3>
        <Form onSubmit={e=>this.handleSubmit(e)}>
          <Form.Field>
            <label>Marker Title</label>
            <input type="text" name="title" required={true}></input>
          </Form.Field>
         
          <Form.Field>
            <label>Marker Info</label>
            <textarea name="info" required={true}></textarea>
          </Form.Field>
        
          <Form.Field>
            <label>Image Url: </label>
            <input type="text" name="image"></input>
          </Form.Field>
         
          <Form.Field control={Button}>
            Submit
          </Form.Field>
        </Form>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createMarker: (marker, mapTitle) => dispatch(createMarker(marker, mapTitle))
  }
}


const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser.currentUser,
      selectedMap: state.maps.selectedMap
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MarkerForm)