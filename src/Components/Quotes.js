import React, { Component } from 'react';
import 'tachyons'

class Quotes extends Component {

  //trigger for "small quote" button to grab small quote from backend and call setter method to change state of currentQuote
  smallQuote = (event) =>
  {
    fetch("http://localhost:5000/quotes/small")
      .then(res => res.text())
      .then(
        (result) => {
           this.props.changeQuote(result)
        },
        (error) => {
          alert(error)
        }
      )
     event.preventDefault();
  }

  //trigger for "medium quote" button to grab small quote from backend and call setter method to change state of currentQuote
  mediumQuote = (event) =>
  {
    fetch("http://localhost:5000/quotes/medium")
      .then(res => res.text())
      .then(
        (result) => {
           this.props.changeQuote(result)
        },
        (error) => {
          alert(error)
        }
      )
     event.preventDefault();
  }

  //trigger for "large quote" button to grab small quote from backend and call setter method to change state of currentQuote
  largeQuote = (event) =>
  {
    fetch("http://localhost:5000/quotes/big")
      .then(res => res.text())
      .then(
        (result) => {
           this.props.changeQuote(result)
        },
        (error) => {
          alert(error)
        }
      )
     event.preventDefault();
  }

  render() {
    return (
      <div className="Quotes">
      <button className="f6 br-pill black mr2 no-underline ba grow pa2 dib" onClick={this.smallQuote}>Small Quote</button>
      <button className="f6 br-pill black mr2 no-underline ba grow pa2 dib" onClick={this.mediumQuote}>Medium Quote</button>
      <button className="f6 br-pill black mr2 no-underline ba grow pa2 dib" onClick={this.largeQuote}>Big Quote</button>
      </div>
    );
  }
}

export default Quotes;
