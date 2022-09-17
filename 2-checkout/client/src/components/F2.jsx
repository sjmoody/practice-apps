// Form
// - Collect ship to address (line 1, line 2, city, state, zip code) and phone number
// - Save data in MySQL with req.session_id
// - Next button to save data and then change to F3
import React from 'react'

class F2 extends React.Component {
  constructor(props){
    super(props);

  }

  render() {
    const handleInputChange = this.props.handleInputChange;

    return (
     <div>
      <h4>Please enter your shipping details</h4>
      <form onSubmit={this.props.handleSubmit}>
        <div>
        <label>Address Line 1</label>
        <input
          type='text'
          value={this.props.line1}
          name="line1"
          onChange={handleInputChange} />
        </div>
        <div>
        <label>Address Line 2</label>
        <input
          name="line2"
          type='text'
          value={this.props.line2}
          onChange={handleInputChange} />
        </div>
        <div>
        <label>City</label>
        <input
          name="city"
          type='text'
          value={this.props.city}
          onChange={handleInputChange} />
        </div>
        <div>
        <label>State</label>
        <input
          name="state"
          type='text'
          value={this.props.state}
          onChange={handleInputChange} />
        </div>
        <div>
        <label>Zip</label>
        <input
          name="shippingZip"
          type='text'
          value={this.props.shippingZip}
          onChange={handleInputChange} />
        </div>
        <div>
        <label>Phone</label>
        <input
          name='phone'
          type='text'
          value={this.props.phone}
          onChange={handleInputChange} />
        </div>
        <input type="submit" value="next" />
      </form>
     </div>
    )
  }
}

export default F2