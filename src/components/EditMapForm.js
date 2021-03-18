import React from 'react'
import {editMap} from '../actions/MapActions.js'
import {connect} from 'react-redux'
class EditMapForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const description = e.target.description.value
    const publicMap = e.target.public.checked
    const map = {id: this.props.selectedMap.id, title: title, description: description, public: publicMap, user_id: this.props.currentUser.id}
    this.props.editMap(map)
    this.props.removeEditForm()
  }

  render() {
    return(
      <div id="new-map-form">
        <form onSubmit={e=>this.handleSubmit(e)}>
          <input type="text" placeholder="Map Title" name="title" defaultValue={this.props.selectedMap.title}></input><br/>
          <textarea placeholder="Description" name="description" defaultValue={this.props.selectedMap.description}></textarea><br/>
          <label>Public?</label><input type="checkbox" name="public" defaultChecked={this.props.selectedMap.public}/><br/>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // createMap: (map) => dispatch(createMap(map))
    editMap: (map) => dispatch(editMap(map))
  }
}


const mapStateToProps = (state) => {
  return {
      currentUser: state.currentUser.currentUser,
      selectedMap: state.maps.selectedMap
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditMapForm)