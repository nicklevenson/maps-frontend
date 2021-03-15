import React from 'react'
import googleLogin from '../assets/btn_google.png'
import {connect} from 'react-redux'  
import {fetchUser} from '../actions/UserActions.js'
import { Redirect } from 'react-router-dom'
class Login extends React.Component {
  state = {
    redirect: false
  }
  componentDidMount() { 
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('token')) {
      const jwt = urlParams.get('token');
      const id = parseInt(urlParams.get('id'))
      sessionStorage.setItem("jwt", jwt)
      this.props.fetchUser(id)
      this.setState({redirect: true})
    }
  

  }
  render(){
    return(
      <div className="login-page">
        <a href="http://localhost:3000/authenticate"><img src={googleLogin} alt="Login with Google"/></a>
        {this.state.redirect ? <Redirect to="my-map" /> : null}

      </div>
    )
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchUser: (userId) => dispatch(fetchUser(userId))
  }
}


export default connect(null, mapDispatchToProps)(Login)