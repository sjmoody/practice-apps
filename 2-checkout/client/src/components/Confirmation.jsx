// TODO:
// - Summarize data collected from previous three steps
// - Purchase button completes purchase and returns user to homepage
import React from 'react';

class Confirmation extends React.Component {
  render(){
    return (
      <div>
        <h4>Summary of information so far (from db)</h4>
        <button onClick={this.props.handleSubmit}>Purchase</button>
      </div>
    )

  }
}

export default Confirmation