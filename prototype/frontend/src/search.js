import { useState } from 'react';
import ReactDOM from 'react-dom/client';

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
