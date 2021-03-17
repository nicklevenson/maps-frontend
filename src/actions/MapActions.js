import { fetchUser } from "./UserActions"

export const addMap = (map) => ({type: "ADD_MAP", payload: map})
export const filterMaps = (mapTitle) => ({type: "FILTER_MAP", payload: mapTitle})
// export const addMapbox = (mapbox) => ({type: "ADD_MAPBOX", payload: mapbox})
export const fetchMaps = () => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/maps`)
    .then(res => res.json())
    .then(maps => {
        maps.forEach(map => dispatch(addMap(map)))
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
          dispatch(filterMaps(json.title))
        }else{
          alert("error creating map")
        }
    })
    .catch(function(error) {  
      alert(error)
    })
  }
}
