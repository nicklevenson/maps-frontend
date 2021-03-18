import React from 'react'
import NewMapForm from '../components/NewMapForm.js'
import Login from '../components/Login.js'
class NewMapContainer extends React.Component {
  state = {
    newMapForm: false
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
          {this.state.newMapForm ? <div onClick={e=>this.removeMapForm()} className="X">X</div> : null }
          <h5 onClick={e=>this.handleClick()} id="new-map-heading">New Map</h5>
          {this.state.newMapForm ? <NewMapForm removeMapForm={this.removeMapForm}/> : null}
        </div>
      )
  }
}
export default NewMapContainer