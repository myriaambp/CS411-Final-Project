import React from "react";
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


// ------------ ELEMENTS -----------------
import SearchTitle from './search_movie';
import AboutUs from './aboutus'
import GoogleAuth from './Twitter_Auth';

// -----------------------------------

const cors = require("cors");






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  // <SearchTitle />
  <div className = "stypid">
      <Router>
        <div>
        <Switch>
          <Route exact path='/'> <SearchTitle /></Route> 
          <Route path='/aboutus'> <AboutUs /></Route>
          <Route path='/auth'>  <GoogleAuth/></Route>
          {/* <Route path='/goats' component={Goats} /> */}
        </Switch>
      </div>
    </Router>
        {/* <Route exact path='/' element = {<SearchTitle />}> </Route> */}
        {/* <Route path='/AboutUs' element = { <AboutUs />}> </Route> */}
        {/* <Route path='/Auth' element = { <GoogleAuth />}> </Route> */}
        {/* <Route path='/goats' component={Goats} /> */}
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
