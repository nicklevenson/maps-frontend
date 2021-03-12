function markersReducer(state={
  markers: [
    {
      title: "Test",
      coordinates: {
      lat: 45.512230,
      lng: -122.658722
      },
      info: "I like this place"
    }
  ]
}, action) {
  switch(action.type){
    case "ADD_MARKER":
    default:
      return state
  }
}

export default markersReducer