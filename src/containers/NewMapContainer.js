import React from 'react'
import NewMapForm from '../components/NewMapForm.js'
class NewMapContainer extends React.Component {
  state = {
    newMapForm: false
  }
  handleClick = (e) => {
    this.setState({newMapForm: true})
  }
  removeMapForm = () => {
    this.setState({newMapForm: false})
  }
  render() {
    return (
      <div className="new-map-container">
        {this.state.newMapForm ? <div onClick={e=>this.removeMapForm()}>X</div> : null }
        <h5 onClick={e=>this.handleClick()}>New Map</h5>
        {this.state.newMapForm ? <NewMapForm/> : null}
      </div>
    )
  }
}
export default NewMapContainer