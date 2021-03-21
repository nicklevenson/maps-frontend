import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import {createMap} from '../actions/MapActions.js'
import {connect} from 'react-redux'
class NewMapForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const description = e.target.description.value
    const publicMap = e.target.public.checked
    const collaborator = this.props.allUsers.filter(u => u.id !== this.props.currentUser.id).find(u => u.username === e.target.collaborator.value) || null

    const map = {title: title, description: description, public: publicMap, user_id: this.props.currentUser.id}
    if (collaborator) {
      map.collaborator = collaborator.id
    }
    this.props.createMap(map)
    this.props.removeMapForm()
  }

  render() {
    return(
      <div id="new-map-form">
        <Form onSubmit={e=>this.handleSubmit(e)}  autocomplete="off">
          <Form.Field>
            <input type="text" placeholder="Map Title" name="title" ></input>
          </Form.Field>
          <Form.Field>
            <textarea placeholder="Description" name="description"></textarea>
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
            <label>Public?</label><input type="checkbox" name="public"/><br/>
          </Form.Field>
      
          {/* <label>Add a collaborator?</label> */}
          <Form.Field control={Button}>
           Create
          </Form.Field>
        </Form>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    createMap: (map) => dispatch(createMap(map))
  }
}


const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser.currentUser,
      allUsers: state.currentUser.allUsers
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMapForm)