// TODO:
// - Summarize data collected from previous three steps
// - Purchase button completes purchase and returns user to homepage
import React from 'react';

class Confirmation extends React.Component {
  render(){

    return (
      <div>
        <h1>Purchase Review: </h1>
        <h2>User Details</h2>
        <div>
        Name: {this.props.name}
        </div>
          <div>
          Email: {this.props.email}
          </div>
          <div>
          Password: {this.props.password}
          </div>

        <h2>Shipping Details</h2>
        <div>
        Address: {this.props.line1}
        </div>
        <div>Address2: {this.props.line2} </div>
        <div>City: {this.props.city}</div>
          <div>
          State: {this.props.state}
            </div>

            <div>
          Zip: {this.props.shippingZip}
        </div>
        <div>Phone: {this.props.phone}</div>

        <h2>Billing Details</h2>
        <div>CC#: {this.props.ccNum}</div>
        <div>Expiry: {this.props.expiry} </div>
          <div>CVV: {this.props.cvv}
        </div>
        <div>Billing Zip: {this.props.billingZip}</div>

        <button onClick={this.props.handleSubmit}>Purchase</button>
      </div>
    )

  }
}

export default Confirmation