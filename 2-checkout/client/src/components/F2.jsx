// Form
// - Collect ship to address (line 1, line 2, city, state, zip code) and phone number
// - Save data in MySQL with req.session_id
// - Next button to save data and then change to F3
import React from 'react'

class F2 extends React.Component {
  constructor(props){
    super(props);
    this.state={
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
      phone: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name] : value
    });

  }

  render() {
    return (
     <div>
      <h4>Please enter your shipping details</h4>
      <form onSubmit={this.props.handleSubmit}>
        <label>Address Line 1</label>
        <input
          type='text'
          value={this.state.value}
          name="line1"
          onChange={this.handleInputChange} />

        <label>Address Line 2</label>
        <input
          name="line2"
          type='text'
          value={this.state.value}
          onChange={this.handleInputChange} />

        <label>City</label>
        <input
          name="city"
          type='text'
          value={this.state.value}
          onChange={this.handleInputChange} />
        <label>State</label>
        <input
          name="state"
          type='text'
          value={this.state.value}
          onChange={this.handleInputChange} />

        <label>Zip</label>
        <input
          name="zip"
          type='text'
          value={this.state.value}
          onChange={this.handleInputChange} />

        <label>Phone</label>
        <input
          name='phone'
          type='text'
          value={this.state.value}
          onChange={this.handleInputChange} />
        <input type="submit" value="next" />
      </form>
      {/* <button onClick={this.props.handleSubmit}>Next</button> */}
     </div>
    )
  }
}

export default F2