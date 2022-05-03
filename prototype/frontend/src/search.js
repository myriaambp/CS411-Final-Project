import React, { Component }  from 'react';

import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

function SearchTitle() {
  const [name, setName] = useState("");
  const [titles, setTitles] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
	  fetch("http://localhost:5000/search_title/" + name)
	  .then(response => response.json())
	  .then(json => {
		  const r = json.results;
		  setTitles(r.map(result => `<li key=` + result.id + `>` + result.title + ` ` + result.description + `</li>`));
	  });
  }

  return (

	  <div>
      <h1 className="title_01"> Movie Sentiment Analyzer </h1>
      <h4 id='header'></h4>
    <form className ="search_statement" onSubmit={handleSubmit}>
      <label>Search for a movie: &nbsp;
        <input 
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <input type="submit" />
    </form>
    
	  <ul><div dangerouslySetInnerHTML={{__html: titles.join("")}} /></ul>
	  </div>

  )
}

{/* <a href="#" onclick="signOut();">Sign out</a>
<script>
  function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
</script> */}


export default SearchTitle;
