import React, { Component } from 'react';
import './App.css';
import 'tachyons'
import publicIp from 'public-ip'
import Quotes from './Components/Quotes';
import Rating from './Components/Rating';
import AvgRating from './Components/AvgRating';



class App extends Component {

  //Constructor to store Quote into currentQuote state
  constructor() 
  {
    super();
    this.state = {currentQuote:""};
  }

  //Method to set state for currentQuote
  changeQuote = (newQuote) =>
  {
    this.setState({currentQuote:newQuote})
  }
  render() 
  {
    // Use Display to toggle ratings based on state of currentQuote
    let display
    if(this.state.currentQuote=="")
    {
      display = <div className="h-10"></div>
    }
    else
    {
      display = <div><Rating currentQuote={this.state.currentQuote}/><AvgRating currentQuote={this.state.currentQuote}/></div>
    }

    return (
      <div className="vh-100 App center dt w-100">
        <p className="h-25 f2 georgia white-80">Quotes by Ron Swanson</p>

        <h1 className="f2 h-25 v-mid georgia measure center washed-blue i"> {this.state.currentQuote} </h1>

        <Quotes changeQuote={this.changeQuote}/>
        {display}


      </div>
    );
  }
}

export default App;
