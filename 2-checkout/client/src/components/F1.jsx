import React from 'react';
// Form
// - Collect name, email, and password for account creation
// - Save in MySQL with req.session_id
// - Next button to change state to F2
class F1 extends React.Component {
  render() {
    return (
      <div>
      <h4>F1 component. Should display name, email, and password form for account creation</h4>
      <button onClick={this.props.handleSubmit}>Next</button>
    </div>
    )


  }

}

export default F1;