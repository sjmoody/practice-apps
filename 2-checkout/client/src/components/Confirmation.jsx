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

        <h2>Billing Details</h2>

        <button onClick={this.props.handleSubmit}>Purchase</button>
      </div>
    )

  }
}

export default Confirmation