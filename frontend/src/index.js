import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './search_movie.css'; // Tell webpack that Button.js uses these styles
import { Route, Switch } from "react-router";




// ------------ ELEMENTS -----------------
import SearchTitle from './search_movie';
import AboutUs from './aboutus'
// -----------------------------------





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  // <Main />
    <Switch>
        <Route path='/' exact component={SearchTitle} />
        <Route path='/AboutUs' component={AboutUs} />
        {/* <Route path='/sheeps' component={Sheeps} /> */}
        {/* <Route path='/goats' component={Goats} /> */}
    </Switch>
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
