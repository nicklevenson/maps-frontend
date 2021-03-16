export default function markersReducer(state={
  markers: [],
  filteredMarkers: []
}, action) {
  switch(action.type){
    case "ADD_MARKER":
      return {...state, markers: [...state.markers,action.payload]}
    case "REMOVE_MARKER":
      return {...state, markers: state.markers.filter(marker => marker.id !== action.payload.id)}
    case "FILTER_MARKERS":
      if (action.payload ===  "All"){
        return {...state, filteredMarkers: state.markers}
      }else{
        return {...state, filteredMarkers: state.markers.filter(marker => marker.user.username === action.payload)}
      }
    default:
      return state
  }
}

