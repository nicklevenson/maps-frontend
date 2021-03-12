function markersReducer(state={
  markers: []
}, action) {
  switch(action.type){
    case "ADD_MARKER":
      console.log(action)
      return {...state, markers: state.markers.concat(action.payload)}
    default:
      return state
  }
}

export default markersReducer