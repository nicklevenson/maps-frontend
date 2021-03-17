import React from 'react'
import NewMapContainer from '../containers/NewMapContainer'

class NewMapForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault()
    const title = e.target.title.value
    const description = e.target.description.value
    console.log(title, description)
  }

  render() {
    return(
      <div className="new-map-form">
        <form onSubmit={e=>this.handleSubmit(e)}>
          <input type="text" placeholder="Map Title" name="title"></input><br/>
          <textarea placeholder="Description" name="description"></textarea><br/>
          <input type="submit"></input>
        </form>
      </div>
    )
  }
}

export default NewMapForm