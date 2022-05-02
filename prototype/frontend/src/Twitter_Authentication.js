import React, { Component }  from 'react';
import { useState } from 'react';
import "./styles.css"
import { FaHeart } from "react-icons/fa";
import { FaGithub } from "react-icons/fa"

function GoogleAuth() {

    return (
        <div className="Container">
          <div className = "topbar">
              <h1 className = "mainLogo"> Moviester </h1>
              <button className = "main"> Main <FaHeart /> </button>
              <button className = "main"> About Us <FaGithub /> </button>

          </div>
            <div>
                <h1 className="title_01"> Sign In! </h1>
                <h4 id='header'> Use Your Google Account </h4>
                <form className ="google_button">
                    
                    <button type = "button"> </button>
                </form>
            </div>
        </div>
        
  
    )
  } 
  export default GoogleAuth;



