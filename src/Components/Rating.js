import React, { Component } from 'react';
import RatingSystem from 'react-ratings-declarative';
import 'tachyons'

class Rating extends Component {

    //Constructor will store IP and user rating into states
  	constructor(props) 
  	{
	    super(props);
	    this.state = {rate:0, ip:""};
  	}

    //Change rating state everytime user change their rating
   changeRating = (newRating) =>
   {
      	this.setState({rate: newRating});
   }

   //Trigger for checkmark button to submit rating. Pass three paramters to backend server and alerts user based on results
  SubmitRating = (event) =>
  {
	fetch("http://localhost:5000/rating/submit",{
        method: 'POST',
        headers: new Headers
        ({
           'Accept': 'application/json',
           'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
        	quote: this.props.currentQuote,
        	visitor: this.state.ip,
        	rate: this.state.rate
        })
      })
      .then(res => res.text())
      .then(
        (result) => 
        {
        	if(result == "True")
        	{

        		alert("Thanks for your submission!")
        	}
        	else
        	{
        		alert("Sorry, only one vote per IP")
        	}
        },
            
        (error) => {
          alert(error)
        }
      )
     event.preventDefault();
  }

    // Grab user's IP address when page loads by calling third party site
    componentDidMount () {
		var proxyUrl = 'https://cors-anywhere.herokuapp.com/', targetUrl = 'https://www.l2.io/ip'
       fetch(proxyUrl + targetUrl)
      .then(res => res.text())
      .then((result) => {
        this.setState({ip: result});
      })
    }

  	render() {
    return (
      <div className="h-25 mv3">
      <RatingSystem
  		rating={this.state.rate}
        widgetRatedColors="blue"
        changeRating={this.changeRating}>
	    <RatingSystem.Widget />
	    <RatingSystem.Widget />
      <RatingSystem.Widget />
      <RatingSystem.Widget />
      <RatingSystem.Widget />
      </RatingSystem>
      <button className="f7 link dim br-pill ba pa2 mb2 dib bg-washed-white navy" onClick={this.SubmitRating}>✓</button>

      </div>
    );
  }
}

export default Rating;
