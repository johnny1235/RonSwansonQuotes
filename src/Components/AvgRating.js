import React, { Component } from 'react';
import 'tachyons'

class AvgRating extends Component {

    //avg is the state used for storing average rating
  	constructor(props) 
  	{
	    super(props);
	    this.state = {avg:0};
  	}

    //Updates components by calling avgRating function to update avg rating if currentQuote state changes
  	componentDidUpdate(prevProps) 
  	{
	    if(this.props.currentQuote !== prevProps.currentQuote)
	    {
	           this.avgRating();
	    }
	}

  //Sending currentQuote parameter to backend to retrieve average rating
  avgRating = (event) =>
  {
	fetch("http://localhost:5000/rating/avg",{
        method: 'POST',
        headers: new Headers
        ({
           'Accept': 'application/json',
           'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
        	quote: this.props.currentQuote,
        })
      })
      .then(res => res.text())
      .then(
        (result) => 
        {
        	this.setState({avg:result})
        },
            
        (error) => {
          alert(error)
        }
      )
  }

  render() {
    return (
      <div className="AvgRating">
      <p className="f4 white">Average Rating: {this.state.avg}</p>
      </div>
    );
  }
}

export default AvgRating;
