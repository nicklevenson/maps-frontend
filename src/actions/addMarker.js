export const addMarker = (marker) => ({type: "ADD_MARKER", payload: marker})

export const fetchMarkers = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/markers')
    .then(res => res.json())
    .then(markers => {
        console.log(markers)
        markers.forEach(marker => dispatch(addMarker(marker)))
    })
}
}