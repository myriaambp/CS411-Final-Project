import './movie.css';
import React  from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';

class Movie extends Component {
    // constructor {d, id, i, t} = this.props;
    constructor(props) {
        super(props);
	this.state = { sentiment : {} };
    }

	componentDidUpdate(prevProps) {
		var sentimentStatement = document.getElementById("sentimentStatement");
		if (this.props.id !== prevProps.id) {
                    	ReactDOM.render("", sentimentStatement);
		} else if (this.state.sentiment.pos_ratio == -1) {
			ReactDOM.render("Sorry, no review data was found.", sentimentStatement);
		} else if (this.state.sentiment.pos_ratio <= 0.5) {
			ReactDOM.render("Only " + (this.state.sentiment.pos_ratio * 100).toFixed(0).toString() + "% of reviewers liked it, and average negative sentiment was " + this.state.sentiment.neg_avg_score.toString(), sentimentStatement);
		} else if (this.state.sentiment.pos_ratio > 0.5) {
			ReactDOM.render("It's looking good! " + (this.state.sentiment.pos_ratio * 100).toFixed(0).toString() + "% of reviewers liked it, and average positive sentiment was " + this.state.sentiment.pos_avg_score.toString(), sentimentStatement);
		} else {
			ReactDOM.render("Something went wrong.", sentimentStatement);
		}
	}
    
    render() {
        let { d, id, i, t } = this.props;
        // curid
        const calcSentiment = (event) => {
            fetch("http://localhost:5000/titleid_reviews/" + id)
            .then(response => response.json())
            .then(json => {
                console.log(json)
		this.setState({ sentiment : json })
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
                <div className = "description" id = "description">
                    <button className = "calcSent" onClick={calcSentiment}> CALCULATE SENTIMENT </button>
                    {/* // + calc_sentiment(movie.id) + */}
		<div className = "sentimentStatement" id = "sentimentStatement"></div>
                </div>
            </div>
        )
    }
} export default Movie;
