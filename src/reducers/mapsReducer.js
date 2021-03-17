export default function MapsReducer(state={
  // mapbox: null,
  maps: [],
  selectedMap: {
    markers: []
  }
}, action) {
  switch(action.type){
    case "ADD_MAP":
      return {...state, maps: [...state.maps,action.payload]}
    case "FILTER_MAP":
      if (action.payload ===  ""){
        return {...state, selectedMap: {markers: []}}
      }else{
        return {...state, selectedMap: state.maps.filter(map =>map.title === action.payload)[0] || {markers: []}}
      }
    // case "ADD_MAPBOX": 
    //   return {...state, mapbox: action.payload}
    default:
      return state
  }
}