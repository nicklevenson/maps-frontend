export const setUser = (user) => ({type: "SET_USER", payload: user})
export const setAllUsers = (users) => ({type: "SET_ALL_USERS", payload: users})

export const fetchUser = () => {
  return (dispatch) => {
    const userId = sessionStorage.userId
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt}`
      }
    })
    .then(res => res.json())
    .then(json => {
        dispatch(setUser(json))
    })
    .catch(function(error) {
        alert("Error getting User.")
    })
  }
}

export const fetchAllUsers = () => {
  return (dispatch) => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/users`,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionStorage.jwt}`
      }
    })
    .then(res => res.json())
    .then(json => {
        dispatch(setAllUsers(json))
    })
    .catch(function(error) {
        alert("Error getting User.")
    })
  }
}

