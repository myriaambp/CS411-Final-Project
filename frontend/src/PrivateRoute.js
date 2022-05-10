// https://stackoverflow.com/questions/47476186/when-user-is-not-logged-in-redirect-to-login-reactjs
// This is used to determine if a user is authenticated and
// if they are allowed to visit the page they navigated to.

// If they are: they proceed to the page
// If not: they are redirected to the login page.
import { React, createContext, useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from './index.js'

const PrivateRoute = ({ component: Component, ...rest }) => {

	const userAuth = useContext(AuthContext);

  // Add your own authentication on the below line.
  const isLoggedIn = userAuth.loginStatus.isAuthenticated;

  return isLoggedIn ? (
          <Route {...rest} component={Component}></Route>
        ) : (
          <Redirect to={{ pathname: '/auth' }} />
        )
}

export default PrivateRoute

