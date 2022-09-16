// Form
// - Collect credit card #, expiry date, CVV, and billing zip code
// - Next button saves data and moves to confirmation page on callback
import React from 'react'

class F3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ccNum: '',
      expiry: '',
      cvv: '',
      billingZip: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    })
  }


  render() {
    return (
      <div>
        <h4>F3 Component. Collects credit card expiry and cvv and billing</h4>
        <form onSubmit={this.props.handleSubmit}>
        <label>Credit Card: </label>
        <input
          type="text"
          name="ccNum"
          value={this.state.ccNum}
          onChange={this.handleInputChange} />

        <label>Expiration Date</label>
        <input
          type="date"
          name="expiry"
          value={this.state.expiry}
          onChange={this.handleInputChange} />

        <label>CVV: </label>
        <input
          type="text"
          name="cvv"
          value={this.state.cvv}
          onChange={this.handleInputChange} />

        <label>Billing Zip: </label>
        <input
          type="text"
          name="billingZip"
          value={this.state.billingZip}
          onChange={this.handleInputChange}/>

        <input type="submit" value="Next" />
        </form>
        <button onClick={this.props.handleSubmit}>Next</button>
      </div>
    )
  }
}

export default F3