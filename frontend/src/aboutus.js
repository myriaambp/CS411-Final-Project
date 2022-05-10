import "./aboutus.css"
import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import Movie from './movie';
import './search_movie.css'; // Tell webpack that Button.js uses these styles
import { FaHeart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaGithub } from "react-icons/fa"
import {Link, withRouter} from 'react-router-dom';
function AboutUs() {


    return (
        <div className = "container">

            <div className = "topbar">
                <h1 className = "mainLogo"> Moviester </h1>
                <button id = "nav-btn-main" className = "main-btn"> <Link to={'/'}> Search <FaHome /> </Link></button>
                <button id = "nav-btn-aboutus" className = "main-btn"> <Link to={'/auth'}> Main <FaHome /> </Link></button>
            </div>
            <br/>
            <br/> 
            <h3> About Us</h3>
            <p>We are the collest company</p>
        </div>
    )

} export default withRouter(AboutUs)
