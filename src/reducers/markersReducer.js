export default function markersReducer(state={
  markers: []
}, action) {
  switch(action.type){
    case "ADD_MARKER":
      return {...state, markers: [...state.markers,action.payload]}
    default:
      return state
  }
}

