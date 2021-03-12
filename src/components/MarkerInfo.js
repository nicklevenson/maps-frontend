import React from 'react'

export default class MarkerInfo extends React.Component {
  render() {
    return(
      <div>
        <h1>{this.props.marker.title}</h1>
        <p>{this.props.marker.info}</p>
      </div>
    )
  }
}