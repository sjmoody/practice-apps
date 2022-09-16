// Form
// - Collect credit card #, expiry date, CVV, and billing zip code
// - Next button saves data and moves to confirmation page on callback
import React from 'react'

class F3 extends React.Component {
  render() {
    return (
      <div>
        <h4>F3 Component. Collects credit card expiry and cvv and billing</h4>
        <button onClick={this.props.handleSubmit}>Next</button>
      </div>
    )
  }
}

export default F3