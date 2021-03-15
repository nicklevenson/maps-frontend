
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'  
import {setUser} from '../actions/UserActions.js'
const Logout = (props) => {
  delete sessionStorage.jwt
  props.setUser({})
  return(
    <div>
      <h1>Bye!</h1>
      <Redirect to="/login"></Redirect>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch(setUser(user)),
 
  }
}
export default connect(null, mapDispatchToProps)(Logout)
