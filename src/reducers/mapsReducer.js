export default function MapsReducer(state={
  // mapbox: null,
  maps: [],
  selectedMap: {
    markers: []
  }
}, action) {
  switch(action.type){
    case "ADD_MAPS":
      return {...state, maps: action.payload}
    case "ADD_MAP":
      return {...state, maps: [...state.maps, action.payload]}
    case "FILTER_MAP":
      if (action.payload ===  ""){
        return {...state, selectedMap: {markers: []}}
      }else{
        return {...state, selectedMap: state.maps.filter(map =>map.title === action.payload)[0] || {markers: []}}
      }
    case "ADD_MARKER_TO_MAP":
      return {...state, selectedMap: {...state.selectedMap, markers: [...state.selectedMap.markers, action.payload]}}
    case "REMOVE_MARKER_FROM_MAP":
      return {...state, selectedMap: {markers: state.selectedMap.markers.filter(m=>m.id !== action.payload.id)}}
    default:
      return state
  }
}