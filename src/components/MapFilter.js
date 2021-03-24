import React from 'react'
import {connect} from 'react-redux'
import {filterMaps, fetchMaps} from '../actions/MapActions.js'
import { Card, Image} from 'semantic-ui-react'
class MapFilter extends React.Component {

  state = {
    filterQuery: ""
  }
  
  componentDidMount() {
    this.props.fetchMaps()
    this.renderMapOptions()
  }
  

  handleChange = (e, title) => {
    if (title === ""){
      this.props.filterMaps("")
    }else{
      this.props.filterMaps(title)
    }  
  }

  handleSearch = (e) => {
    this.setState({filterQuery: e.target.value.toLowerCase()})
  }
  renderMapOptions = () => {
    if (window.location.pathname === "/my-maps"){
      return this.props.currentUser.maps.map(m=>m)
    }else{
        return this.props.maps.filter(m=>m.public === true).map(m=>m)
    }
  }

  render(){
    return(
      <>
        <div className="maps-list-header">
          <h3>Maps</h3>
          <input className="map-filter" type="text" placeholder="Search by Title or Username" onChange={e=>this.handleSearch(e)}></input>
        </div>

        <div className="maps-list">
          <Card className="maps-list-card">
            {this.renderMapOptions().filter(m=>m.title.toLowerCase().includes(this.state.filterQuery) || m.users.map(u=>u.username.toLowerCase()).some(u => u.includes(this.state.filterQuery))).map(map => {
              return (
                <Card.Content onClick={e => this.handleChange(e, map.title)} className="map-card" 
                  style={this.props.selectedMap.title === map.title ? {backgroundColor: "rgba(235, 233, 243, 0.849)"} : null}>
                  <Card.Header name="title">{map.title}</Card.Header>
                  <div className="img-holder">{map.users.map(u => <Image className="very-tiny" circular src={u.image}></Image>)}</div>
                </Card.Content>
              )
            })}
          </Card>
        </div>
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterMaps: (mapTitle) => dispatch(filterMaps(mapTitle)),
    fetchMaps: () => dispatch(fetchMaps())
  }
}


const mapStateToProps = (state) => {
  return {
      maps: state.maps.maps,
      currentUser: state.currentUser.currentUser,
      selectedMap: state.maps.selectedMap
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapFilter)