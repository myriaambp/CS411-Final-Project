import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import './styles.css';

function SearchTitle() {
  const [name, setName] = useState("");
  const [titles, setTitles] = useState([]);
  const [loginStatus, setLoginStatus] = useState({
	  isAuthenticated: false,
	  user: null,
	  token: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
	  fetch("http://localhost:5000/search_title/" + name,{
		  headers: { 'Authorization': 'Basic ' + btoa(loginStatus['user'] + ":" + loginStatus['token']) }
	  })
	  .then(response => response.json())
	  .then(json => {
		  const r = json.results;
		  setTitles(r.map(result => `<li key=` + result.id + `>` + result.title + ` ` + result.description + `</li>`));
	  });
  }

  const loginSuccess = (response) => {
	  console.log(response);
	  fetch("http://localhost:5000/login/", {
		  method: 'POST',
		  headers: { 'Content-Type': 'application/json' },
		  body: JSON.stringify(response)
	  })
	  .then(test => console.log(test));
	  setLoginStatus({
		  isAuthenticated: true,
		  user: response.googleId,
		  token: response.accessToken
	  });
  }

  const loginFailure = (error) => {
	  console.log(error);
	  alert(error['error']);
  }

  const logoutSuccess = (response) => {
	  console.log(response);
	  setLoginStatus({
		  isAuthenticated: false,
		  user: null,
		  token: ''
	  });
  }

  return loginStatus['isAuthenticated'] ? (
	  <div>
      <h1 className="title_01"> Movie Sentiment Analyzer </h1>
      <h4 id='header'></h4>
    <form className ="search_statement" onSubmit={handleSubmit}>
      <label>Search for a movie: &nbsp;
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
	  <ul><div dangerouslySetInnerHTML={{__html: titles.join("")}} /></ul>
			<GoogleLogout
      clientId="303901244551-3c5bs2cp41i0odqvccur94so8vh9rces.apps.googleusercontent.com"
      buttonText="Logout"
      onLogoutSuccess={logoutSuccess}
    >
    </GoogleLogout>
	  </div>

  ) :
	(
		<div>
	<GoogleLogin
    clientId="303901244551-3c5bs2cp41i0odqvccur94so8vh9rces.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={loginSuccess}
    onFailure={loginFailure}
    cookiePolicy={'single_host_origin'}
  />
		</div>
	);
}



export default SearchTitle;
