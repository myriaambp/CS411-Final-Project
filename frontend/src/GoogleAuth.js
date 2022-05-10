import { useState, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import { AuthContext } from './index.js';
import { FaHome } from "react-icons/fa";
import { FaGithub } from "react-icons/fa"
import { GiMagnifyingGlass } from "react-icons/gi";
import {useHistory} from "react-router-dom";
import {Link, withRouter} from "react-router-dom";
import './styles.css';

function GoogleAuth() {

	const userAuth = useContext(AuthContext);

	const [loggedIn, setLoggedIn] = useState(userAuth.loginStatus['isAuthenticated']);

  const loginSuccess = (response) => {
	  console.log(response);
	  fetch("http://localhost:5000/login/", {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify(response)
	  })
	  .then(test => console.log(test));
	  userAuth.setLoginStatus({
		  isAuthenticated: true,
		  user: response.googleId,
		  token: response.accessToken
	  });
	  setLoggedIn(true);
  }

  const loginFailure = (error) => {
	  console.log(error);
	  alert(error['error']);
  }

  const logoutSuccess = (response) => {
	  console.log(response);
	  userAuth.setLoginStatus({
		  isAuthenticated: false,
		  user: null,
		  token: ''
	  });
	  setLoggedIn(false);
  }

  return loggedIn ? (
        <div className="Container">
          <div className = "topbar">
              <h1 className = "mainLogo"> Moviester </h1>
              <button className = "main"> <Link to = {'/'}>  Search <GiMagnifyingGlass /> </Link> </button>
              <button className = "main"> <Link to={'/aboutus'}> About Us <FaGithub /> </Link> </button>
          </div>
            <div>
                <h1 className="title_01"> You are logged in! </h1>
                <h4 id='header'> Sign out </h4>
			<GoogleLogout
      clientId="303901244551-3c5bs2cp41i0odqvccur94so8vh9rces.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logoutSuccess}
    >
    </GoogleLogout>
            </div>
        </div>
  ) :
	(
        <div className="Container">
          <div className = "topbar">
              <h1 className = "mainLogo"> Moviester </h1>
              <button className = "main"> <Link to={'/aboutus'}> About Us <FaGithub /> </Link> </button>
          </div>
            <div>
                <h1 className="title_01"> You must login to use the search! </h1>
                <h4 id='header'> Sign in with Google </h4>
	<GoogleLogin
    clientId="303901244551-3c5bs2cp41i0odqvccur94so8vh9rces.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={loginSuccess}
    onFailure={loginFailure}
    cookiePolicy={'single_host_origin'}
  />
            </div>
        </div>
	);
}



export default withRouter(GoogleAuth);

