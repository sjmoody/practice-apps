import React from 'react';

// TODO: Save in MySQL with req.session_id

class F1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: ''
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
      <h4>F1 component. Should display name, email, and password form for account creation</h4>
      <form onSubmit={this.props.handleSubmit}>
        <label>
          Name:
        </label>
        <input type="text" value={this.state.value} onChange={this.handleInputChange} />

        <label>Email</label>
        <input type="text" value={this.state.value} onChange={this.handleInputChange} />

        <label>Password</label>
        <input type="password" value={this.state.value} onChange={this.handleInputChange} />
        <input type="submit" value="Next" />
      </form>
    </div>
    )


  }

}

export default F1;