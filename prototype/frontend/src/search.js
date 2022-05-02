import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import $ from 'jquery'; 


function SearchTitle() {
  const [name, setName] = useState("");
  const [titles, setTitles] = useState([]);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("WHATS UP")

    var newData =   {
      "subject:title":"Test Name",
      "subject:description":"Creating test subject to check POST method API",
      "sub:tags": ["facebook:work", "facebook:likes"],
      "sampleSize" : 10,
      "values": ["science", "machine-learning"]
    };

      var dataJson = JSON.stringify(newData);

      $.ajax({
      type: 'POST',
      url: "./helloworld",
      data: dataJson,
      error: function(e) {
        console.log("ERROR \n" + (e));
      },
      success: function(data){
        console.log(data)
      },
      dataType: "json",
      contentType: "application/json"
      });


    // const Http = new XMLHttpRequest();
    // const url = '/frontend/src/api';
    // Http.open("POST", url);
    // Http.setRequestHeader("Content-type", "application/json");
    // Http.send(this);

    // Http.onreadystatechange = e => {
    //     // window.location.replace("/add");
    // }


    // $.ajax({
    //   type: 'POST',
    //   url: "scripts/sample.py",
    //   data: {param: xyz}, //passing some input here
    //   dataType: "text",
    //   success: function(response){
    //      output = response;
    //      alert(output);
    //   }
    // }).done(function(data){
    //   console.log(data);
    //   alert(data);
    // });



    // $.ajax({
    //   type: "POST",
    //   url: "/api",
    //   data: "message=" + "display-results" + "&movie=" + "endgame",
    //   success: function(data) {
    //     console.log("SUCCESS ACHIEVED")
    //     console.log(data)
    //     document.getElementById("printerror").innerHTML = data;
    //   }
    // })



    // const { spawn } = require('child_process');

    // const sensor = spawn('python', ['api.py']);
    // sensor.stdout.on('data', function(data) {

    // // convert Buffer object to Float
    //   console.log("HELLO WORLD")
    //   console.log(data)
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
      <p id = "printerror">
      {/* TO BE POPULATED */}
      Hello Wow
      </p>
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
