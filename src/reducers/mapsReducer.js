export default function MapsReducer(state={
  maps: [],
  selectedMap: {
    markers: []
  }
}, action) {
  switch(action.type){
    case "ADD_MAP":
      return {...state, maps: [...state.maps,action.payload]}
   
    default:
      return state
  }
}