export default function userReducer(state={
  currentUser: {
    markers: []
  }
}, action) {
  switch(action.type){
    case "SET_USER":
      return {...state, currentUser: action.payload}
    default:
      return state
  }
}
