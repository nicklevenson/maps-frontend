import React from 'react'
import googleLogin from '../assets/btn_google.png'
import facebookLogin from '../assets/facebook-login.png'
import {connect} from 'react-redux'  
import {fetchUser} from '../actions/UserActions.js'
import { Redirect } from 'react-router-dom'
import { Card} from 'semantic-ui-react'
class Login extends React.Component {
 
  componentDidMount() { 
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('token')) {
      const jwt = urlParams.get('token');
      const id = parseInt(urlParams.get('id'))
      sessionStorage.setItem("jwt", jwt)
      sessionStorage.setItem("userId", id)
      this.props.fetchUser()
      this.setState({redirect: true})
    }
  

  }
  render(){
    return(
      <div className="login-page" style={{width: "300px", height: "50vh",margin: "auto", marginTop: "20vh"}}>
        <Card fluid>
          <br></br>
          <Card.Header><h2>Please Login/Signup</h2></Card.Header>
          
          {this.props.heading ? <Card.Content><h5><i>{this.props.heading}</i></h5></Card.Content>: null}
          <br></br>
          <Card.Content>
          <a href={`${process.env.REACT_APP_BACKEND_URL}/authenticate`}><img src={googleLogin} alt="Login with Google" style={{width: "200px"}}/></a><br></br> <br></br>
          <a href={`${process.env.REACT_APP_BACKEND_URL}/authenticate-facebook`}><img src={facebookLogin} alt="Login with Facebook"  style={{width: "200px"}}></img></a> <br></br> <br></br>
          </Card.Content>
          {sessionStorage.jwt ? <Redirect to="my-maps" /> : null}
        </Card>
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