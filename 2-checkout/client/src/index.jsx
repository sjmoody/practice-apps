import React from "react";
import { render } from "react-dom";
import F1 from "./components/F1.jsx"
import F2 from "./components/F2.jsx"
import F3 from "./components/F3.jsx"
import Confirmation from "./components/Confirmation.jsx"

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stage: 'Home'
    }
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleCollectShipping = this.handleCollectShipping.bind(this);
    this.handleCollectBilling = this.handleCollectBilling.bind(this);
    this.handlePurchaseConfirmation = this.handlePurchaseConfirmation.bind(this);
  }

  handleCheckout(){
    console.log("Checkout button pressed");
    this.setState({stage: 'F1'})
  }

  handleCreateAccount(){
    console.log("Button pressed on F1. Will attempt to save account details here")
    this.setState({stage: 'F2'})
  }

  handleCollectShipping(){
    console.log("Button pressed on F2. Will attempt to save shipping details here")
    this.setState({stage: 'F3'})
  }

  handleCollectBilling(){
    console.log("Button pressed on F3. Will attempt to save billing details.")
    this.setState({stage: 'Confirmation'})
  }

  handlePurchaseConfirmation(){
    console.log("Button pressed on confirmation. Will attempt to purchase and return to homepage")
    this.setState({stage:"Home"})
  }

  render() {
    let stage = this.state.stage;
    if (stage === 'Home') {
      return (
        <div>
          <p>Home page</p>
          <p>
          <code>Page Cookie is: {JSON.stringify(document.cookie, undefined, "\t")}</code>
          <button onClick={this.handleCheckout}>Checkout</button>
          </p>
        </div>
      );
    } else if (stage === 'F1') {
      return (
        <div>
          <F1 handleSubmit={this.handleCreateAccount}/>
          <p>
          <code>Page Cookie is: {JSON.stringify(document.cookie, undefined, "\t")}</code>
          </p>
        </div>
      )


    } else if (stage === 'F2') {
      return (
        <div>
          <F2 handleSubmit={this.handleCollectShipping}/>
          <p>
          <code>Page Cookie is: {JSON.stringify(document.cookie, undefined, "\t")}</code>
          </p>
        </div>
      )

    } else if (stage === 'F3') {
      return (
        <div>
          <F3 handleSubmit={this.handleCollectBilling}/>
          <p>
          <code>Page Cookie is: {JSON.stringify(document.cookie, undefined, "\t")}</code>
          </p>
        </div>
      )

    } else if (stage === 'Confirmation') {
      return (
        <div>
          <Confirmation handleSubmit={this.handlePurchaseConfirmation} />
          <p>
          <code>Page Cookie is: {JSON.stringify(document.cookie, undefined, "\t")}</code>
          </p>
        </div>
      );
    }
    else {
      return (
        <div>
          <p>Buying stage is: {stage}</p>
          <F1 />
          <F2 />
          <F3 />
          <p>
          <code>Page Cookie is: {JSON.stringify(document.cookie, undefined, "\t")}</code>
          </p>
        </div>
      );
    }


  }

}
render(<App />, document.getElementById("root"));

// TODO
// - Convert this into a React Component
// - Store view state (Home, F1, F2, F3, Confirmation)
// - Switch render depending on view state
// - Add Checkout button
