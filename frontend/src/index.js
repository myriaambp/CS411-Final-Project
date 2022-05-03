import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './search_movie.css'; // Tell webpack that Button.js uses these styles
// import { Route, Switch } from "react-router";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";




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
  <Router>
     <Routes>
        <Route path='/' element={<SearchTitle />} />
        <Route path='/AboutUs' element={<AboutUs />} />
        <Route path='/Auth' component={<GoogleAuth />} />
        {/* <Route path='/goats' component={Goats} /> */}
    </Routes>
  </Router>
   
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
