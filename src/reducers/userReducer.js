export default function userReducer(state={
  currentUser: {
    markers: [],
    likedMarkers: []
  },
  allUsers: []
}, action) {
  switch(action.type){
    case "SET_USER":
      return {...state, currentUser: action.payload}
    case "SET_ALL_USERS":
      return {...state, allUsers: action.payload}
    default:
      return state
  }
}
