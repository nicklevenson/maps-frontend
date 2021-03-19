import React from 'react'
import {editMap, deleteMap} from '../actions/MapActions.js'
import { Form, Button } from 'semantic-ui-react'
import {connect} from 'react-redux'
class EditMapForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const description = e.target.description.value
    const publicMap = e.target.public.checked
    const collaborator = this.props.allUsers.filter(u => u.id !== this.props.currentUser.id).find(u => u.username === e.target.collaborator.value) || null
    const map = {id: this.props.selectedMap.id, title: title, description: description, public: publicMap, user_id: this.props.currentUser.id}
    if (collaborator) {
      map.collaborator = collaborator.id
    }
    this.props.editMap(map)
    this.props.removeEditForm()
  }

  deleteMap = () => {
    this.props.deleteMap(this.props.selectedMap)
    this.props.removeEditForm()
    alert("Map Deleted")
  }

  render() {
    return(
      <div id="new-map-form">
           <Form onSubmit={e=>this.handleSubmit(e)}  autocomplete="off">
          <Form.Field>
            <input type="text" placeholder="Map Title" name="title" defaultValue={this.props.selectedMap.title}></input>
          </Form.Field>
          <Form.Field>
            <textarea placeholder="Description" name="description" defaultValue={this.props.selectedMap.description}></textarea>
          </Form.Field>
          <Form.Field>
            <label>Add a Mate?</label>
            <i>(Once added, they may add markers to this map)</i>
            <input type="text" list="users" name="collaborator" placeholder="Select or Search for a Mate"></input>
            <datalist id="users" >
              {this.props.allUsers.filter(u => u.id !== this.props.currentUser.id).map(u=><option key={u.id}>{u.username}</option>)}
            </datalist>
          </Form.Field>
          <Form.Field>
            <label>Public?</label><input type="checkbox" name="public" defaultChecked={this.props.selectedMap.public}/><br/>
          </Form.Field>
          {/* <label>Add a collaborator?</label> */}
          <Form.Field control={Button}>
           Update
          </Form.Field>
        </Form>
        <div style={{width:"max-content"}} className="X" onClick={e=>this.deleteMap()}><h6>Delete Map</h6></div>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // createMap: (map) => dispatch(createMap(map))
    editMap: (map) => dispatch(editMap(map)),
    deleteMap: (map) => dispatch(deleteMap(map))
  }
}


const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser.currentUser,
      selectedMap: state.maps.selectedMap,
      allUsers: state.currentUser.allUsers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMapForm)