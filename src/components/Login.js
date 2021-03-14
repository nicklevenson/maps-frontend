import React from 'react'
import googleLogin from '../assets/btn_google.png'

class Login extends React.Component {

  componentDidMount() { 
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('token')) {
      const jwt = urlParams.get('token');
      sessionStorage.setItem("jwt", jwt)
      window.location = "/my-map";
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

export default Login