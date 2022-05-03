// https://ultimatedjango.com/blog/how-to-consume-rest-apis-with-django-python-reques/
import ReactDOM from 'react-dom/client';
import React, { useState, useEffect } from 'react';
import Movie from './movie';
import './search_movie.css'; // Tell webpack that Button.js uses these styles
import { FaHeart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { FaGithub } from "react-icons/fa"


function SearchTitle() {
    const [name, setName] = useState("");
    const [titles, setTitles] = useState([]);
    var jsonresults = ""

    const handleSubmit = (event) => {
        var movie = document.getElementById("movie_input").value;
        var resultHTML = document.getElementById("results");
        var movies_container = document.getElementById("movies_container");
        if(movie.length < 3) {
            alert("Please Fill In more than 2 characters")
        } else {
            fetch("https://imdb-api.com/en/API/SearchMovie/k_wz4q71x5/"+movie)
            .then(res => res.json())
            .then(
                (result) => {
                    // resultHTML.value = result
                    // console.log(result)
                    jsonresults = JSON.parse(JSON.stringify(result))
                    var movie_results = jsonresults.results
                    console.log(movie_results)
                    var count = 0
                    for (let i in movie_results){
                        movie = movie_results[0]
                        console.log(movie)
                        // movies_container.append(<Movie id={count} description={i[0]} ID={i[1]} Image={i[2]} Title={i[4]} />);
                        movies_container.innerHTML = 
                                '<div className="movie" style="display: block; width: 40% !important;">'
                                    + '<div className="title-year">'
                                        + '<h2 className="title" style="margin:3px">' + movie.title + '</h2>'
                                        + '<h5 className="year" style="margin:5px">' + movie.description + '</h5>'    
                                    + '</div>'
                                    + '<div className="poster">'
                                        + '<img src="' + movie.image + '" alt="my movie poster" style = "width: 260px !important; height: 400px !important; "/>'
                                    + '</div>'
                                    + '<div className = "description">'
                                        // + movie.description +
                                    + '</div>'
                                + '</div>'
                        count += 1
                        // console.log(i)
                    }
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
            <button className = "main-btn"> Main <FaHome /> </button>
            <button className = "main-btn"> About Us <FaGithub /> </button>

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
