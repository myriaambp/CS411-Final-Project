import React from "react";
import { useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './search_movie.css'; // Tell webpack that Button.js uses these styles
import PrivateRoute from './PrivateRoute.js';
//import InitializeAuth from './InitializeAuth.js';
//import { AuthContext } from './InitializeAuth.js';


// ------------ ELEMENTS -----------------
import SearchTitle from './search_movie';
import AboutUs from './aboutus'
import GoogleAuth from './GoogleAuth';

// -----------------------------------

const cors = require("cors");

export const AuthContext = createContext();
{/*const [loginStatus, setLoginStatus] = useState({
	  isAuthenticated: false,
	  user: null,
	  token: ''
});
const contextLoginStatus = {
	loginStatus: loginStatus,
	setLoginStatus: (value) => setLoginStatus(value)
};
*/}
const contextLoginStatus = {
	loginStatus: {
		isAuthenticated: false,
		user: null,
		token: ''
	},
	setLoginStatus: (value) => contextLoginStatus.loginStatus = value
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	  <div className = "stypid">
	<AuthContext.Provider value={contextLoginStatus}>
      <Router>
        <div>
        <Switch>
          <PrivateRoute exact path='/' component={SearchTitle}></PrivateRoute> 
          <Route path='/aboutus' component={AboutUs}></Route>
          <Route path='/auth' component={GoogleAuth}></Route>
        </Switch>
      </div>
    </Router>
	</AuthContext.Provider>
   </div>

   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// # READ ME:
// #Run the project with 
// 
// python3 manage.py runserver
// cs frontend
// #npm run build
// npm start
