import React from "react";
import { render } from "react-dom";
import F1 from "./components/F1.jsx"
import F2 from "./components/F2.jsx"
import F3 from "./components/F3.jsx"
import Confirmation from "./components/Confirmation.jsx"
import axios from 'axios';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      stage: 'Home',
      name: '',
      email: '',
      password: '',

      line1: '',
      line2: '',
      city: '',
      state: '',
      shippingZip: '',
      phone: '',

      ccNum: '',
      expiry: '',
      cvv: '',
      billingZip: ''
    }
    this.handleCheckout = this.handleCheckout.bind(this);
    this.handleCreateAccount = this.handleCreateAccount.bind(this);
    this.handleCollectShipping = this.handleCollectShipping.bind(this);
    this.handleCollectBilling = this.handleCollectBilling.bind(this);
    this.handlePurchaseConfirmation = this.handlePurchaseConfirmation.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.expressCheckout = this.expressCheckout.bind(this);
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;
    console.log(`Change to input. Name: ${name} and new value: ${value}`)
    this.setState({
      [name]:value
    })
  }

  handleCheckout(){
    console.log("Checkout button pressed");
    this.setState({stage: 'F1'})
  }

  handleCreateAccount(){
    console.log("Button pressed on F1. Will attempt to save account details here")
    console.log(`State of account. Name: ${this.state.name} Email: ${this.state.email} Password: ${this.state.password}`)
    this.setState({stage: 'F2'})
    event.preventDefault();

  }

  handleCollectShipping(){
    console.log("Button pressed on F2. Will attempt to save shipping details here")
    console.log(`State of account. Line 1: ${this.state.line1} Line2: ${this.state.line2} City: ${this.state.city} State: ${this.state.state} Zip: ${this.state.shippingZip} Phone: ${this.state.phone}`)
    this.setState({stage: 'F3'})
    event.preventDefault();

  }

  handleCollectBilling(){
    console.log("Button pressed on F3. Will attempt to save billing details.")
    console.log(`State of Billing. CC#: ${this.state.ccNum} Expires: ${this.state.expiry} CVV: ${this.state.cvv} Zip: ${this.state.billingZip}`)
    this.setState({stage: 'Confirmation'})
    event.preventDefault();

  }

  handlePurchaseConfirmation(details){
    // console.log("Button pressed on confirmation. Will attempt to purchase and return to homepage")
    alert("Purchase request submitted");
    event.preventDefault();
    let purchaseObj =  {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      line1: this.state.line1,
      line2: this.state.line2,
      city: this.state.city,
      state: this.state.state,
      shippingZip: this.state.shippingZip,
      phone: this.state.phone,
      ccNum: this.state.ccNum,
      expiry: this.state.expiry,
      cvv: this.state.cvv,
      billingZip: this.state.billingZip
    }
    console.log("JSX sending purchase info. ");
    console.log(purchaseObj);
    axios.post('/purchase', purchaseObj)
      .then((res) => {
        console.log(res);
        alert(`Purchase successful.`)
        this.setState({stage:"Home"})
      })
      .catch((err) => {
        console.log('error making purchase')
        alert(`error making purchase please try again. ${err}`);
      })
  }

  expressCheckout(){
    console.log("Will express checkout")
    let details = {
      name: 'Steven Moody',
      email: 'smoody07@gmail.com',
      password: 'asdasd',
      line1: '3710 El Camino Real',
      line2: 'Apt 6919',
      city: 'Santa Clara',
      state: 'CA',
      shippingZip: '95051',
      phone: '17028868834',
      ccNum: '234234',
      expiry: '2022-01-01',
      cvv: '4564',
      billingZip: '95060'
    }
    this.handlePurchaseConfirmation(details);
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
          {/* <button onClick={this.expressCheckout}>Express Checkout</button> */}
          </p>
        </div>
      );
    } else if (stage === 'F1') {
      return (
        <div>
          <F1
            name={this.state.name}
            email={this.state.email}
            password={this.state.password}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleCreateAccount}/>
          <p>
          <code>Page Cookie is: {JSON.stringify(document.cookie, undefined, "\t")}</code>
          </p>
        </div>
      )


    } else if (stage === 'F2') {
      return (
        <div>
          <F2
            line1={this.state.line1}
            line2={this.state.line2}
            city={this.state.city}
            state={this.state.state}
            shippingZip={this.state.shippingZip}
            phone={this.state.phone}
            handleInputChange={this.handleInputChange}
            handleSubmit={this.handleCollectShipping}/>
          <p>
          <code>Page Cookie is: {JSON.stringify(document.cookie, undefined, "\t")}</code>
          </p>
        </div>
      )

    } else if (stage === 'F3') {
      return (
        <div>
          <F3
            ccNum={this.state.ccNum}
            expiry={this.state.expiry}
            cvv={this.state.cvv}
            billingZip={this.state.billingZip}
            handleInputChange={this.handleInputChange}

            handleSubmit={this.handleCollectBilling}/>
          <p>
          <code>Page Cookie is: {JSON.stringify(document.cookie, undefined, "\t")}</code>
          </p>
        </div>
      )

    } else if (stage === 'Confirmation') {
      return (
        <div>
          <Confirmation
            name={this.state.name}
            email={this.state.email}
            password={this.state.password}
            line1={this.state.line1}
            line2={this.state.line2}
            city={this.state.city}
            state={this.state.state}
            shippingZip={this.state.shippingZip}
            phone={this.state.phone}
            ccNum={this.state.ccNum}
            expiry={this.state.expiry}
            cvv={this.state.cvv}
            billingZip={this.state.billingZip}
            handleSubmit={this.handlePurchaseConfirmation} />
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
