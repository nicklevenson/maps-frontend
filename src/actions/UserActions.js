export const setUser = (user) => ({type: "SET_USER", payload: user})

export const fetchUser = () => {
  return (dispatch) => {
    const userId = sessionStorage.userId
    fetch(`http://localhost:3000/users/${userId}`)
    .then(res => res.json())
    .then(json => {
        dispatch(setUser(json))
    })
    .catch(function(error) {
      alert("Errors getting markers.")
    })
  }
}