export default function markersReducer(state={
  markers: []
}, action) {
  switch(action.type){
    case "ADD_MARKER":
      return {...state, markers: [...state.markers,action.payload]}
    case "REMOVE_MARKER":
      return {...state, markers: state.markers.filter(marker => marker.id !== action.payload.id)}
    default:
      return state
  }
}

