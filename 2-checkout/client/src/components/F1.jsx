import React from 'react';

// TODO: Save in MySQL with req.session_id

class F1 extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    let handleInputChange = this.props.handleInputChange;
    return (
      <div>
      <h4>F1 component. Should display name, email, and password form for account creation</h4>
      <form onSubmit={this.props.handleSubmit}>
        <label>
          Name:
        </label>
        <input
          name="name"
          type="text"
          value={this.props.name}
          // value={this.state.value}
          onChange={handleInputChange} />

        <label>Email</label>
        <input
          name="email"
          type="text"
          value={this.props.email}
          // value={this.state.value}
          onChange={handleInputChange} />

        <label>Password</label>
        <input
          name="password"
          type="password"
          value={this.props.password}
          // value={this.state.value}
          onChange={handleInputChange} />
        <input type="submit" value="Next" />
      </form>
    </div>
    )


  }

}

export default F1;