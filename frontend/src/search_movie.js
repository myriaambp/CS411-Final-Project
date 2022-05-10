// https://ultimatedjango.com/blog/how-to-consume-rest-apis-with-django-python-reques/
import React, { useState, useEffect } from 'react';
import './search_movie.css'; // Tell webpack that Button.js uses these styles
import { FaHome } from "react-icons/fa";
import { FaGithub } from "react-icons/fa"
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";
import Movie from './movie';
import ReactDOM from 'react-dom';

function SearchTitle() {
    const [name, setName] = useState("");
    const [titles, setTitles] = useState([]);
    var jsonresults = ""

    const handleSubmit = (event) => {
        var moviename = document.getElementById("movie_input").value;
        var movies_container = document.getElementById("movies_container");
        if(moviename.length < 3) {
            alert("Please Fill In more than 2 characters")
        } else {
            // fetch("https://imdb-api.com/en/API/SearchMovie/k_wz4q71x5/"+moviename)
            fetch("https://imdb-api.com/en/API/SearchMovie/k_wz4q71x5/"+moviename)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result)
                    // resultHTML.value = result
                    // console.log(result)
                    var movie_elements = []
                    jsonresults = JSON.parse(JSON.stringify(result))
                    var movie_results = jsonresults.results
                    for(var i = 0; i < movie_results.length; i++) {
                        let movie = movie_results[i];
                        console.log(movie)
                        movie_elements.push(<Movie d={movie.description} id={movie.id} i={movie.image} t={movie.title} />);
                    }   
                    ReactDOM.render(movie_elements, movies_container);
                    console.log(movie_elements);
                },
                (error) => {
                    console.log(error)
                }
            )
        }
    }

    return (
    <div className = "container">
        <div className = "topbar">
            <h1 className = "mainLogo"> Moviester </h1>
            <button id = "nav-btn-main" className = "main-btn"> <Link to={'/Auth'}> Main <FaHome /> </Link></button>
            <button id = "nav-btn-aboutus" className = "main-btn"> <Link to={'/aboutus'}> About Us <FaGithub /> </Link></button>

        </div>
        <br/>
        <br/> 
        <div className = "movie_search_form">
            <h4> Search For a Movie!</h4>
            <input type = "text" className = "movieInput" placeholder='Search ... ' id = "movie_input"></input>
            <button className = "submit-movie-btn" onClick={handleSubmit}> CLICK</button>
        </div>
        <div className = "movie_search_results">
            <h1  className = "results_text">  RESULTS </h1>
            {/* <p id = "results"> {jsonresults} </p> */}
            <div className = "movies_container" id = "movies_container">
                {/* TO BE POPULATED BY JSON */}
            </div>
        </div>     
    </div>
    )

}

export default SearchTitle
