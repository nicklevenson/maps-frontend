import React from 'react'
import googleLogin from '../assets/btn_google.png'
import {connect} from 'react-redux'  
import {fetchUser} from '../actions/UserActions.js'
class Login extends React.Component {

  componentDidMount() { 
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('token')) {
      const jwt = urlParams.get('token');
      const id = parseInt(urlParams.get('id'))
      console.log(id)
      sessionStorage.setItem("jwt", jwt)
      window.location = "/my-map";
      this.props.fetchUser(id)
    }
  

  }
  render(){
    return(
      <div className="login-page">
        <a href="http://localhost:3000/authenticate"><img src={googleLogin} alt="Login with Google"/></a>
      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: () => dispatch(fetchUser())
  }
}


export default connect(null, mapDispatchToProps)(Login)