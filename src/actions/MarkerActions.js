import { fetchUser } from "./UserActions"


export const addMarker = (marker) => ({type: "ADD_MARKER", payload: marker})
export const removeMarker = (marker) => ({type: "REMOVE_MARKER", payload: marker})

export const fetchMarkers = () => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/markers`)
    .then(res => res.json())
    .then(markers => {
        markers.forEach(marker => dispatch(addMarker(marker)))
    })
    .catch(function(error) {
      alert("Errors getting markers.")
    })
  }
}

export const createMarker = (marker) => {
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
      if (json.message) {
        dispatch(addMarker(json.marker))
        dispatch(fetchMarkers())
        dispatch(fetchUser())
      }else{
        alert("Errors saving marker.")
      }
    })
    
    .catch(function(error) {
      alert("Errors saving marker.")
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
        dispatch(removeMarker(marker))
        dispatch(fetchMarkers())
        alert("Marker Deleted. You may have to refresh to notice changes.")
      }else{
        alert("Errors deleting marker.")
      }
    })
    
    .catch(function(error) {
      alert("Errors deleting marker.")
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
        alert("Marker Removed from your map. You may have to refresh to notice changes.")
      }else{
        alert("Errors removing marker to your map.")
      }
    })
    
    .catch(function(error) {
      alert("Errors removing marker to your map.")
    })
  }
}