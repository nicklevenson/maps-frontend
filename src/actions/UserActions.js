export const setUser = (user) => ({type: "SET_USER", payload: user})

export const fetchUser = () => {
  return (dispatch) => {
    const userId = sessionStorage.userId
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`)
    .then(res => res.json())
    .then(json => {
        dispatch(setUser(json))
    })
    .catch(function(error) {
      
    })
  }
}