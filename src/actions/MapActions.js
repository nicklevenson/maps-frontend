import { fetchUser } from "./UserActions"

export const addMaps = (maps) => ({type: "ADD_MAPS", payload: maps})
export const addMap = (map) => ({type: "ADD_MAP", payload: map})
export const filterMaps = (mapTitle) => ({type: "FILTER_MAP", payload: mapTitle})
export const addMarkerToMap = (marker) => ({type: "ADD_MARKER_TO_MAP", payload: marker})
export const removeMarkerFromMap = (marker) => ({type: "REMOVE_MARKER_FROM_MAP", payload: marker})
// export const addMapbox = (mapbox) => ({type: "ADD_MAPBOX", payload: mapbox})
export const fetchMaps = () => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/maps`)
    .then(res => res.json())
    .then(maps => {
       dispatch(addMaps(maps))
    })
    .catch(function(error) {
      alert("Errors getting maps.")
    })
  }
}


export const createMap = (map) => {
  return (dispatch) => {
    let configObj = {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${sessionStorage.jwt}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({map: map})
  }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/maps`, configObj)
    .then(res => res.json())
    .then(json => {
        if (json.id) {
          dispatch(addMap(json))
          dispatch(fetchUser())
          dispatch(fetchMaps())
          dispatch(filterMaps(json.title))
        }else{
          alert(json.error)
        }
    })
    .catch(function(error) {  
      alert(error)
    })
  }
}
export const editMap = (map) => {
  return (dispatch) => {
    let configObj = {
      method: 'PATCH',
      headers: {
          Authorization: `Bearer ${sessionStorage.jwt}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({map: map})
  }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/maps/${map.id}`, configObj)
    .then(res => res.json())
    .then(json => {
        if (json.id) {
          dispatch(addMap(json))
          dispatch(fetchUser())
          dispatch(fetchMaps())
          dispatch(filterMaps(json.title))
        }else{
          alert(json.error)
        }
    })
    .catch(function(error) {  
      alert(error)
    })
  }
}

export const deleteMap = (map) => {
  return (dispatch) => {
    let configObj = {
      method: 'DELETE',
      headers: {
          Authorization: `Bearer ${sessionStorage.jwt}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
  }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/maps/${map.id}`, configObj)
    .then(res => res.json())
    .then(json => {
        if (json.message) {
          dispatch(fetchUser())
          dispatch(fetchMaps())
          dispatch(filterMaps(""))
        }else{
          alert("Error deleting map")
        }
    })
    .catch(function(error) {  
      alert("Error deleting map")
    })
  }
}
