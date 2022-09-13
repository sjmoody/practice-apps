import React from 'react';
import Stack from 'react-bootstrap/Stack';


class NewWordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {wordValue: '', definitionValue: '' }

    this.handleDefinitionChange = this.handleDefinitionChange.bind(this);
    this.handleWordChange = this.handleWordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleDefinitionChange(event){
    this.setState({definitionValue: event.target.value})

  }

  handleWordChange(event){
    this.setState({wordValue: event.target.value})
  }

  handleSubmit(event){
    alert(`new word submitted: ${this.state.wordValue} with definition: ${this.state.definitionValue}`)
    // TODO: call db function to create new word
    event.preventDefault();
  }


  render() {
    return (
      <div>
      <h4>Add a new word:</h4>

        <Stack direction="horizontal" gap={3}>

        <form onSubmit={this.handleSubmit}>
          <label>Word</label>
          <input type="text" value={this.state.wordValue} onChange={this.handleWordChange} />
          <label>Definition</label>
          <textarea type="text" rows="3" value={this.state.definitionValue} onChange={this.handleDefinitionChange} />
        <input type="submit" value="Submit" />
        </form>
        </Stack>
        </div>
      )
  }

}

export default NewWordForm;