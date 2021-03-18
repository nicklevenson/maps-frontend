import React from 'react'
import NewMapContainer from '../containers/NewMapContainer'
import {createMap} from '../actions/MapActions.js'
import {connect} from 'react-redux'
class NewMapForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const description = e.target.description.value
    const publicMap = e.target.public.checked
    const map = {title: title, description: description, public: publicMap, user_id: this.props.currentUser.id}
    this.props.createMap(map)
    this.props.removeMapForm()
  }

  render() {
    return(
      <div id="new-map-form">
        <form onSubmit={e=>this.handleSubmit(e)}>
          <input type="text" placeholder="Map Title" name="title" ></input><br/>
          <textarea placeholder="Description" name="description"></textarea><br/>
          <label>Public?</label><input type="checkbox" name="public"/><br/>
          <input type="submit"></input>
        </form>
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
      currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMapForm)