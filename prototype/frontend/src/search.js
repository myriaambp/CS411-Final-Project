import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import $ from 'jquery'; 


function SearchTitle() {
  const [name, setName] = useState("");
  const [titles, setTitles] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    $.ajax({
      type: "GET",
      url: "./cgi-bin/test2.py",
      data: {
          message: "display-results",
          movie: "endgame"
      },
      success: function(data) {
        console.log(data)
        console.log("HELLO WORLD")
      }
    })
    // const { spawn } = require('child_process');
    // const temperatures = []; // Store readings

    // const sensor = spawn('python', ['api.py']);
    // console.log(sensor)
    // sensor.stdout.on('data', function(data) {

    //     // convert Buffer object to Float
    //     temperatures.push(parseFloat(data));
    //     console.log(temperatures);
    // });

	  // fetch("http://localhost:5000/search_title/" + name)
	  // .then(response => response.json())
	  // .then(json => {
		//   const r = json.results;
		//   setTitles(r.map(result => `<li key=` + result.id + `>` + result.title + ` ` + result.description + `</li>`));
	  // });
  }

  return (
	  <div>
    <form onSubmit={handleSubmit}>
      <label>Search for a movie:
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

export default SearchTitle;
