export default function MapsReducer(state={
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
    default:
      return state
  }
}