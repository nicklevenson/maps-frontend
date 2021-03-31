import React from 'react'
import NewMapForm from '../components/NewMapForm.js'
import EditMapForm from '../components/EditMapForm.js'

class NewMapContainerMobile extends React.Component {
  state = {
    newMapForm: false,
    editMapForm: false
  }

  componentDidUpdate() {
    this.triggerState()
  }

  triggerState = () => {
    if (this.props.editMapForm && this.state.editMapForm === false) {
      this.setState({editMapForm: true})
    }else if (this.props.editMapForm === false && this.state.editMapForm === true){
      this.setState({editMapForm: false})
    }
  }
  handleClick = (e) => {
    if (sessionStorage.jwt) {
      this.setState({newMapForm: true})
    }else{
      document.getElementById("new-map-heading").innerHTML = "<a href='/login'>Please Login First</a>"
    }
  }
  removeMapForm = () => {
    this.setState({newMapForm: false})
  }
  render() {
      return (
        <div className="new-map-container">
          {this.state.newMapForm || this.state.editMapForm ? <div onClick={e=>{this.removeMapForm(); this.props.removeEditForm()}} className="X">X</div> : null }
          {this.state.editMapForm ? <h5 onClick={e=>this.handleClick()} id="new-map-heading">Edit Map</h5> : <h5 onClick={e=>this.handleClick()} id="new-map-heading">New Map</h5>}
          {this.state.newMapForm ? <NewMapForm removeMapForm={this.removeMapForm}/> : null}
          {this.state.editMapForm ? <EditMapForm removeEditForm={this.props.removeEditForm}/> : null}
        </div>
      )
  }
}
export default NewMapContainerMobile