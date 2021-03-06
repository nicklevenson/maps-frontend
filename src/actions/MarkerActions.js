import { fetchUser } from "./UserActions"
import { addMarkerToMap, fetchMaps, removeMarkerFromMap, filterMaps } from './MapActions'


export const addMarker = (marker) => ({type: "ADD_MARKER", payload: marker})
export const removeMarker = (marker) => ({type: "REMOVE_MARKER", payload: marker})
export const filterMarkers = (username) => ({type: "FILTER_MARKERS", payload: username})

export const fetchMarkers = () => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/markers`)
    .then(res => res.json())
    .then(markers => {
        markers.forEach(marker => dispatch(addMarker(marker)))
        dispatch(filterMarkers("All"))
    })
    .catch(function(error) {
      alert("Errors getting markers.")
    })
  }
}

export const createMarker = (marker, mapTitle) => {
  
  return (dispatch) => {
    let configObj = {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${sessionStorage.jwt}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({marker: marker})
  }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/markers`, configObj)
    .then(res => res.json())
    .then(json => {
    
        dispatch(addMarkerToMap(json))
        // dispatch(filterMaps(mapTitle))
        dispatch(fetchMaps())
      
    })
    .catch(function(error) {
    
      alert(error)
    
    })
  }
}


export const destroyMarker = (marker) => {
  return (dispatch) => {
    let configObj = {
      method: 'DELETE',
      headers: {
          Authorization: `Bearer ${sessionStorage.jwt}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      }
    }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/markers/${marker.id}`, configObj)
    .then(res => res.json())
    .then(json => {
      if (json.message) {
        dispatch(fetchMaps())
        dispatch(removeMarkerFromMap(marker))
        dispatch(fetchUser())
        // alert("Marker Deleted. You may have to refresh to notice changes.")
      }else{
        alert("Errors deleting marker.")
      }
    })
    
    .catch(function(error) {
      alert("Errors deleting marker.")
    })
  }
}

export const addMarkerToUserMap = (marker_id, map_id) => {
  return (dispatch) => {
    let configObj = {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${sessionStorage.jwt}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({marker_id: marker_id, map_id: map_id})
  }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/addToMap`, configObj)
    .then(res => res.json())
    .then(json => {
      if (json.message){
        dispatch(fetchMaps())
        dispatch(fetchUser())
      }else{
        alert(json.error)
      }
      
    })
    .catch(function(error) {
        alert(error)
    })
  }
}

export const removeMarkerFromUserMap = (marker, map_id) => {
  return (dispatch) => {
    let configObj = {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${sessionStorage.jwt}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({marker_id: marker.id, map_id: map_id})
  }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/removeFromMap`, configObj)
    .then(res => res.json())
    .then(json => {
      if (json.message){
        dispatch(removeMarkerFromMap(marker))
        dispatch(fetchMaps())
        dispatch(fetchUser())
      }else{
        alert(json.error)
      }
      
    })
    .catch(function(error) {
        alert(error)
    })
  }
}

export const likeMarker = (marker, currentUserId) => {
  return (dispatch) => {
    let configObj = {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${sessionStorage.jwt}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({marker: marker, currentUserId: currentUserId})
    }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/likes`, configObj)
    .then(res => res.json())
    .then(json => {
      if (json.message) {
        dispatch(fetchMarkers())
        dispatch(fetchUser())
        
      }else{
        alert("Errors adding marker to your map.")
      }
    })
    
    .catch(function(error) {
      alert("Errors adding marker to your map.")
    })
  }
}


export const unlikeMarker = (marker, currentUserId) => {
  return (dispatch) => {
    let configObj = {
      method: 'POST',
      headers: {
          Authorization: `Bearer ${sessionStorage.jwt}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({marker: marker, currentUserId: currentUserId})
    }
    fetch(`${process.env.REACT_APP_BACKEND_URL}/likes/goodbye`, configObj)
    .then(res => res.json())
    .then(json => {
      if (json.message) {
        dispatch(fetchMarkers())
        dispatch(fetchUser())
        // alert("Marker Removed from your map. You may have to refresh to notice changes.")
      }else{
        alert("Errors removing marker to your map.")
      }
    })
    
    .catch(function(error) {
      alert("Errors removing marker to your map.")
    })
  }
}