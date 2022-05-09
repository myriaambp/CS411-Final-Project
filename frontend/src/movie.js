import './movie.scc';
import React  from 'react';
import {Component} from 'react';


class Movie extends Component {
    // constructor {d, id, i, t} = this.props;
    constructor(props) {
        super(props);
    }

    
    
    render() {
        let { d, id, i, t } = this.props;
        // curid
        const calcSentiment = (event) => {
            fetch("http://localhost:5000/pythonapi/" + {id})
            .then(response => response.json())
            .then(json => {
                const r = json.results;
            }).then (res => {
                console.log(res)
            })
        }

        console.log(d);
        return (
            <div className="movie">
                <div className="title-year">
                    <h2 className="title"> {t} </h2> 
                    <h5 className="year"> {d} </h5>
                </div>
                <div className="poster">
                    <img src={i}  className="image" />
                </div>
                <div className = "description">
                    <button className = "calcSent" onClick={calcSentiment}> CALCULATE SENTIMENT </button>
                    {/* // + calc_sentiment(movie.id) + */}
                </div>
            </div>
        )
    }
} export default Movie;