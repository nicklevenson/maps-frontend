import React from 'react'
import {connect} from 'react-redux'
import {filterMaps, fetchMaps} from '../actions/MapActions.js'
import { Card, Image} from 'semantic-ui-react'
class MapFilter extends React.Component {

  state = {
    filterQuery: ""
  }
  
  componentDidMount() {
    // this.props.fetchAllUsers()
    // this.renderUserOptions()
   
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
      // if (this.props.currentUser.username) {
      //   return this.props.maps.filter(m=>m.public === true || this.props.currentUser.maps.map(m=>m.id).includes(m.id)).map(m=>m.title)
      // }else{
        return this.props.maps.filter(m=>m.public === true).map(m=>m)
      // }
      
    }

  }

  render(){
    return(
      <>

        {/* <form onChange={e=>this.handleChange(e)} onSelect={e=>this.handleChange(e)}>
            <input type="text" list="usersFilter" placeholder="Search for a Map"></input>
            <input type="reset" id="reset" value="X" onClick={e => this.handleChange(e)}></input>
            <datalist id="usersFilter">
              {this.renderMapOptions().map(m=><option key={m.id}>{m.title}</option>)}
            </datalist>
            
        </form> */}
        
        <div className="maps-list-header">
          <h3>Maps</h3>
          <input className="map-filter" type="text" placeholder="Search by Title or Username" onChange={e=>this.handleSearch(e)}></input>
        </div>

        <div className="maps-list">
        <Card className="maps-list-card">
          {this.renderMapOptions().filter(m=>m.title.toLowerCase().includes(this.state.filterQuery) || m.markers.map(m=>m.user.username.toLowerCase()).some(u => u.includes(this.state.filterQuery))).map(map => {
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
    // filterMarkers: (username) => dispatch(filterMarkers(username)),
    // fetchAllUsers: () => dispatch(fetchAllUsers())
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