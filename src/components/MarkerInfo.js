import React from 'react'

export default class MarkerInfo extends React.Component {
  render() {
    return(
      <div>
        {this.props.marker.title ? <div onClick={e=>this.props.handleMarkerSelect({})}>X</div> : null}
        <h1>{this.props.marker.title}</h1>
        <p>{this.props.marker.info}</p>
      </div>
    )
  }
}