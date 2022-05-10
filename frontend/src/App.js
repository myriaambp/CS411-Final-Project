import logo from './logo.svg';
import './App.css';
import { useState, createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import './search_movie.css'; // Tell webpack that Button.js uses these styles
//import PrivateRoute from './PrivateRoute.js';


// ------------ ELEMENTS -----------------
import SearchTitle from './search_movie';
import AboutUs from './aboutus'
import GoogleAuth from './GoogleAuth';

// -----------------------------------

export const AuthContext = createContext();

function App() {

const [loginStatus, setLoginStatus] = useState({
	  isAuthenticated: false,
	  user: null,
	  token: ''
});
const contextLoginStatus = {
	loginStatus: loginStatus,
	setLoginStatus: (value) => setLoginStatus(value)
};

const PrivateRoute = ({ component: Component, ...rest }) => {

  // Add your own authentication on the below line.
  const isLoggedIn = loginStatus.isAuthenticated;

  return isLoggedIn ? (
          <Route {...rest} component={Component} />
        ) : (
          <Redirect to={{ pathname: '/auth' }} />
        )
}

  return (
  <div className = "stypid">
	<AuthContext.Provider value={contextLoginStatus}>
      <Router>
        <Switch>
          <PrivateRoute exact path='/' component={SearchTitle}> </PrivateRoute> 
          <Route path='/aboutus' component={AboutUs}></Route>
          <Route path='/auth' component={GoogleAuth}></Route>
          {/* <Route path='/goats' component={Goats} /> */}
        </Switch>
    </Router>
	</AuthContext.Provider>
	  </div>
  );
}

export default App;
