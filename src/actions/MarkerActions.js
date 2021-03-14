export const addMarker = (marker) => ({type: "ADD_MARKER", payload: marker})

export const fetchMarkers = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/markers')
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
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({marker: marker})
  }
    fetch('http://localhost:3000/markers', configObj)
    .then(res => res.json())
    .then(json => {
      console.log(json)
      if (json.message) {
        dispatch(addMarker(json.marker))
      }else{
        alert("Errors saving marker.")
      }
    })
    .catch(function(error) {
      alert("Errors saving marker.")
    })
  }
}